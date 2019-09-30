/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
foam.CLASS({
  package: 'foam.nanos.crunch',
  name: 'UserCapabilityJunctionDAO',
  extends: 'foam.dao.ProxyDAO',

  documentation: `Authenticated DAO decorator to only show capabilities owned by a user. Updates can only be performed by system.`,

  javaImports: [
    'foam.core.FObject',
    'foam.dao.ArraySink',
    'foam.dao.DAO',
    'foam.nanos.auth.*',
    'foam.nanos.auth.User',
    'foam.nanos.crunch.Capability',
    'foam.nanos.crunch.CapabilityJunctionStatus',
    'foam.nanos.crunch.UserCapabilityJunction',
    'foam.nanos.logger.Logger',
    'java.text.DateFormat',
    'java.text.SimpleDateFormat',
    'java.util.Calendar',
    'java.util.Date',
    'java.util.List',
    'static foam.mlang.MLang.*'
  ],

  methods: [
    {
      name: 'getUser',
      args: [
        {
          name: 'x',
          type: 'Context'
        }
      ],
      type: 'foam.nanos.auth.User',
      javaCode: `
      User user = (User) x.get("user");
      if ( user == null ) throw new AuthenticationException("user not found");
      return user;
      `
    },
    {
      name: 'checkOwnership',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'obj',
          type: 'foam.core.FObject'
        }
      ],
      documentation: `Check if current user has permission to add this junction`,
      javaCode: `
        User user = getUser(x);
        AuthService auth = (AuthService) x.get("auth");
        boolean isOwner = ((UserCapabilityJunction) obj).getSourceId() == user.getId();
        boolean hasPermission = auth.check(x, "*");
        if ( ! isOwner && ! hasPermission ) throw new AuthorizationException("permission denied");
      `
    },
    {
      name: 'getFilteredDAO',
      args: [
        {
          name: 'x',
          type: 'Context'
        }
      ],
      type: 'foam.dao.DAO',
      documentation: `Return list of junctions the current user has read access to`,
      javaCode: `
      User user = getUser(x);
      AuthService auth = (AuthService) x.get("auth");
      if ( auth.check(x, "service.*") ) return getDelegate();
      return getDelegate().where(
        EQ(UserCapabilityJunction.SOURCE_ID, user.getId())
      ); 
      `
    },
    {
      name: 'put_', 
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'obj',
          type: 'foam.core.FObject'
        }
      ],
      type: 'foam.core.FObject',
      documentation: `
      Set the status of the junction before putting by checking if prerequisites are fulfilled and data required is validated.
      If status is set to GRANTED, check if junctions depending on current can be granted
      `,
      javaCode: `
      checkOwnership(x, obj);

      // if the junction is being uppdated from GRANTED to EXPIRED, put into junctionDAO without checking prereqs and data
      UserCapabilityJunction old = (UserCapabilityJunction) getDelegate().find_(x, ((UserCapabilityJunction) obj).getId());
      if ( old.getStatus() == CapabilityJunctionStatus.GRANTED && ((UserCapabilityJunction) obj).getStatus() == CapabilityJunctionStatus.EXPIRED ) 
        return getDelegate().put_(x, obj);

      boolean prereq = checkPrereqs(x, obj);
      boolean data = validateData(x, obj);

      if ( prereq && data ) {
        ((UserCapabilityJunction) obj).setStatus(CapabilityJunctionStatus.GRANTED);
        saveDataToDAO(x, ((UserCapabilityJunction) obj));
        configureJunctionExpiry(x, (UserCapabilityJunction) obj, old);
      }
      else ((UserCapabilityJunction) obj).setStatus(CapabilityJunctionStatus.PENDING);

      return getDelegate().put_(x, obj);
      
      `
    },
    {
      name: 'saveDataToDAO',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'obj',
          type: 'foam.nanos.crunch.UserCapabilityJunction'
        }
      ],
      documentation: `save the UserCapabilityJunction data to its dao, if daoKey is provided in the Capability model`,
      javaCode: `
      DAO capabilityDAO = (DAO) x.get("capabilityDAO");
      Logger logger = (Logger) x.get("logger");
      Capability capability = (Capability) capabilityDAO.find(obj.getTargetId());
      
      String daoKey = capability.getDaoKey();
      if ( daoKey == null ) return;
      
      DAO dao = (DAO) x.get(daoKey);
      if ( dao == null ) return;

      if ( dao.getOf().getId() == (obj.getData()).getClassInfo().getId() ) {
        try {
          dao.put(obj.getData());
        } catch (Exception e) {
          logger.debug("Data cannot be added to " + daoKey + " for UserCapabilityJunction object : " + obj.getId() );
        }
      }
      `
    },
    {
      name: 'configureJunctionExpiry',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'obj',
          type: 'foam.nanos.crunch.UserCapabilityJunction'
        },
        {
          name: 'old',
          type: 'foam.nanos.crunch.UserCapabilityJunction'
        }
      ],
      type: 'foam.core.FObject',
      documentation: `Set the expiry of a userCapabilityJunction based on the duration or expiry set on the capability, which
      ever one comes first`,
      javaCode: `
      // Only update the expiry for non-active junctions, i.e., non-expired, non-pending, or granted junctions whose expiry is not yet set
      if ( ( old.getStatus() == CapabilityJunctionStatus.GRANTED && old.getExpiry() != null ) || obj.getStatus() != CapabilityJunctionStatus.GRANTED ) 
        return obj;

      DAO capabilityDAO = (DAO) x.get("capabilityDAO");
      Capability capability = (Capability) capabilityDAO.find((String) obj.getTargetId());
      Date junctionExpiry = capability.getExpiry();
      
      if ( capability.getDuration() > 0 ) {
        DateFormat format = new SimpleDateFormat("yyyy/MM/dd");
        Date today = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(today);
        calendar.add(Calendar.DATE, capability.getDuration());

        if ( junctionExpiry == null ) junctionExpiry = calendar.getTime();
        else junctionExpiry = junctionExpiry.after(calendar.getTime()) ? calendar.getTime() : junctionExpiry;
      }
      obj.setExpiry(junctionExpiry);
      return obj;
      ` 
    },
    {
      name: 'checkPrereqs',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'obj',
          type: 'foam.core.FObject'
        }
      ],
      type: 'Boolean',
      documentation: `Check if prerequisites of a capability is fulfilled`,
      javaCode: `
      DAO capabilityDAO = (DAO) x.get("capabilityDAO");
      DAO prerequisiteCapabilityJunctionDAO = (DAO) (x.get("prerequisiteCapabilityJunctionDAO"));
      Capability capability = (Capability) capabilityDAO.find(((UserCapabilityJunction) obj).getTargetId());

      List<CapabilityCapabilityJunction> ccJunctions = (List<CapabilityCapabilityJunction>) ((ArraySink) prerequisiteCapabilityJunctionDAO
      .where(EQ(CapabilityCapabilityJunction.TARGET_ID, (String) capability.getId()))
      .select(new ArraySink()))
      .getArray();

      for ( CapabilityCapabilityJunction ccJunction : ccJunctions ) {
        Capability cap = (Capability) ((DAO) x.get("capabilityDAO")).find((String) ccJunction.getSourceId());
        if (!cap.getEnabled()) continue;
        UserCapabilityJunction ucJunction = (UserCapabilityJunction) getDelegate().find(AND(
          EQ(UserCapabilityJunction.SOURCE_ID, ((UserCapabilityJunction) obj).getSourceId()),
          EQ(UserCapabilityJunction.TARGET_ID, (String) ccJunction.getSourceId())
        ));
        
        if ( ucJunction == null || ucJunction.getStatus() != CapabilityJunctionStatus.GRANTED ) return false;
      }
      return true;
      `
    },
    {
      name: 'validateData',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'obj',
          type: 'foam.core.FObject'
        }
      ],
      type: 'Boolean',
      documentation: `call the validate method on data and if not "return true" then set the junction status to pending`,
      javaCode: `
        try {
          FObject data = ((UserCapabilityJunction) obj).getData();
          data.validate(x);
        } catch(Exception e) {
          return false;
        }
        return true;
      `
    },
    {
      name: 'remove_',
      javaCode: `
      checkOwnership(x, obj);
      return super.remove_(x, obj);
      `
    },
    {
      name: 'removeAll_',
      javaCode: `
      DAO dao = getFilteredDAO(x);
      dao.removeAll_(x, skip, limit, order, predicate);
      `
    },
    {
      name: 'select_',
      javaCode: `
      DAO dao = getFilteredDAO(x);
      return dao.select_(x, sink, skip, limit, order, predicate);
      `
    },
    {
      name: 'find_',
      javaCode:`
      FObject result = super.find_(x, id);
      if(result != null) checkOwnership(x, result);
      return result;
      `
    }
  ]
});
  
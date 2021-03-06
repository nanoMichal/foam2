/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

foam.CLASS({
  package: 'foam.box',
  name: 'Message',

  javaImports: [
    'foam.nanos.crunch.CapabilityRuntimeException'
  ],

  properties: [
    {
      class: 'Map',
      name: 'attributes',
      javaFactory: 'return new java.util.HashMap();'
    },
    {
      class: 'Object',
      name: 'object'
    },
    {
      class: 'Map',
      transient: true,
      name: 'localAttributes',
      javaFactory: 'return new java.util.HashMap();'
    }
  ],

  methods: [
    {
      name: 'replyWithException',
      type: 'Void',
      args: [
        { name: 't', javaType: 'Throwable' }
      ],
      javaCode: `
        Box replyBox = (Box) getAttributes().get("replyBox");

        if ( replyBox == null ) return;

        RemoteException wrapper = new RemoteException();
        wrapper.setId(t.getClass().getName());
        wrapper.setMessage(t.getMessage());
        if ( t instanceof foam.core.Exception ) {
          var fe = (foam.core.Exception) t;
          wrapper.setException(t);
        }
        
        // Special case for CapabilityRuntimeException
        if (
          "foam.nanos.crunch.CapabilityRuntimeException"
          .equals(t.getClass().getName())
        ) {
          CapabilityRuntimeException tCapability =
            (CapabilityRuntimeException) t;
          CapabilityRequiredRemoteException wrapperCapability =
            new CapabilityRequiredRemoteException();
          wrapperCapability.setId(t.getClass().getName());
          wrapperCapability.setMessage(t.getMessage());
          wrapperCapability.setCapabilityOptions(
            tCapability.getCapabilities());
          wrapperCapability.setCapableRequirements(
            tCapability.getCapables());
          wrapperCapability.setDaoKey(
            tCapability.getDaoKey());
          wrapper = wrapperCapability;
        }

        RPCErrorMessage reply = new RPCErrorMessage();
        reply.setData(wrapper);

        Message replyMessage = new Message();
        replyMessage.setObject(reply);

        replyBox.send(replyMessage);
      `
    }
  ]
});

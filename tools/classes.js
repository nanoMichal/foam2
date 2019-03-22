/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

var classes = [
  'foam.core.Axiom',
  'foam.core.Detachable',
  'foam.core.Serializable',
  'foam.core.ContextAware',
  'foam.core.Exception',
  'foam.core.Freezable',
  'foam.core.ContextAgent',
  'foam.core.Identifiable',
  'foam.core.AbstractFObject',
  'foam.core.Validatable',
  'foam.mlang.predicate.Predicate',
  'foam.mlang.predicate.True',
  'foam.mlang.predicate.False',
  'foam.mlang.predicate.And',
  'foam.mlang.predicate.Gt',
  'foam.mlang.predicate.Or',
  'foam.mlang.predicate.AbstractPredicate',
  'foam.mlang.predicate.Nary',
  'foam.mlang.predicate.Unary',
  'foam.mlang.predicate.Binary',
  'foam.mlang.predicate.ArrayBinary',
  'foam.mlang.predicate.Contains',
  'foam.mlang.predicate.ContainsIC',
  'foam.mlang.predicate.StartsWith',
  'foam.mlang.predicate.StartsWithIC',
  'foam.mlang.predicate.Gt',
  'foam.mlang.predicate.Gte',
  'foam.mlang.predicate.Neq',
  'foam.mlang.predicate.Not',
  'foam.mlang.predicate.Lt',
  'foam.mlang.predicate.In',
  'foam.mlang.predicate.Lte',
  'foam.mlang.predicate.Has',
  'foam.mlang.predicate.Keyword',
  'foam.mlang.predicate.IsInstanceOf',
  'foam.mlang.sink.Count',
  'foam.mlang.sink.GroupBy',
  'foam.mlang.F',
  'foam.mlang.Expr',
  'foam.mlang.AbstractExpr',
  'foam.mlang.predicate.Eq',
  'foam.mlang.Constant',
  'foam.mlang.ArrayConstant',
  'foam.mlang.expr.Dot',
  'foam.mlang.PredicatedExpr',
  'foam.mlang.ContextObject',
  'foam.box.Box',
  'foam.box.Skeleton',
  'foam.box.AbstractSkeleton',
  'foam.box.ProxyBox',
  'foam.box.SubBox',
  'foam.box.Message',
  'foam.box.RegisterSelfMessage',
  'foam.box.SubBoxMessage',
  'foam.box.SubscribeMessage',
  'foam.box.NamedBox',
  'foam.box.HTTPBox',
  'foam.box.HTTPReplyBox',
  'foam.box.AuthServiceClientBox',
  'foam.nanos.app.AppConfig',
  'foam.nanos.http.WebAgent',
  'foam.nanos.hello.HelloService',
  'foam.nanos.hello.ClientHelloService',
  'com.google.foam.demos.heroes.Hero',
  'com.google.auth.TokenVerifier',
  'foam.box.RemoteException',
  'foam.box.RPCMessage',
  'foam.box.RPCReturnBox',
  'foam.box.RPCReturnMessage',
  'foam.box.RPCErrorMessage',
  'foam.box.BoxRegistry',
  'foam.box.NoSuchNameException',
  'foam.box.ReplyBox',
  'foam.box.LocalBoxRegistry',
  'foam.box.BoxRegistryBox',
  'foam.box.RawWebSocketBox',
  'foam.box.ReturnBox',
  'foam.box.BoxService',
  'foam.box.CheckAuthenticationBox',
  'foam.box.SessionReplyBox',
  'foam.box.SessionClientBox',
  'foam.dao.DAO',
  'foam.dao.java.JDAO',
  'foam.dao.FilteredDAO',
  'foam.dao.Journal',
  'foam.dao.RemoveChildrenOnRemoveDAO',
  'foam.dao.AbstractJournal',
  'foam.dao.ProxyJournal',
  'foam.dao.CompositeJournal',
  'foam.dao.FileJournal',
  'foam.dao.RoutingJournal',
  'foam.dao.RoutingJournalTest',
  'foam.dao.RoutingJDAO',
  'foam.dao.JournalType',
  'foam.dao.WriteOnlyJDAO',
  'foam.dao.WriteOnlyFileJournal',
  'foam.dao.BaseClientDAO',
  'foam.dao.ClientDAO',
  'foam.dao.ClientSink',
  'foam.dao.ResetSink',
  'foam.dao.DAOSink',
  'foam.dao.MergedResetSink',
  'foam.dao.Sink',
  'foam.dao.ArraySink',
  'foam.dao.AbstractSink',
  'foam.mlang.sink.AbstractUnarySink',
  'foam.dao.PredicatedSink',
  'foam.dao.OrderedSink',
  'foam.dao.LimitedSink',
  'foam.dao.SkipSink',
  'foam.dao.DedupSink',
  'foam.dao.ReadOnlyDAO',
  'foam.dao.RelationshipDAO',
  'foam.dao.ManyToManyRelationship',
  'foam.dao.ManyToManyRelationshipImpl',
  'foam.dao.ManyToManyRelationshipDAO',
  'foam.dao.SQLStatement',
  'foam.dao.EasyDAO',
  'foam.dao.EnabledAwareDAO',
  'foam.dao.EnabledAwareDAOTest',
  'foam.dao.index.PersistedIndexTest',
  'foam.dao.SequenceNumberDAO',
  'foam.dao.SequenceNumberDAOTest',
  'foam.mlang.order.Comparator',
  'foam.mlang.order.Desc',
  'foam.mlang.sink.Count',
  'foam.mlang.sink.Max',
  'foam.mlang.sink.Min',
  'foam.mlang.sink.Sum',
  'foam.mlang.sink.Average',
  'foam.mlang.sink.Map',
  'foam.nanos.actioncommand.ActionCommand',
  'foam.nanos.NanoService',
  'foam.nanos.boot.NSpec',
  'foam.nanos.boot.NSpecAware',
  'foam.nanos.app.Mode',
  'foam.nanos.bench.Benchmark',
  'foam.nanos.auth.EnabledAware',
  'foam.nanos.auth.EnabledAwareDummy',
  'foam.nanos.auth.Group',
  'foam.nanos.auth.CreatedAware',
  'foam.nanos.auth.CreatedAwareDAO',
  'foam.nanos.auth.CreatedByAware',
  'foam.nanos.auth.CreatedByAwareDAO',
  'foam.nanos.auth.LastModifiedAware',
  'foam.nanos.auth.LastModifiedAwareDAO',
  'foam.nanos.auth.LastModifiedByAware',
  'foam.nanos.auth.LastModifiedByAwareDAO',
  'foam.nanos.auth.Permission',
  'foam.nanos.auth.DayOfWeek',
  'foam.nanos.auth.Hours',
  'foam.nanos.auth.Address',
  'foam.nanos.auth.Phone',
  'foam.nanos.auth.HumanNameTrait',
  'foam.nanos.auth.User',
  'foam.nanos.auth.Country',
  'foam.nanos.auth.AuthService',
  'foam.nanos.auth.UserUserJunction',
  'foam.nanos.auth.ClientAuthService',
  'foam.nanos.auth.ClientLoginAuthService',
  'foam.nanos.auth.AgentAuthService',
  'foam.nanos.auth.ClientAgentAuthService',
  'foam.nanos.auth.HtmlDoc',
  'foam.nanos.auth.PasswordExpiryAuthService',
  'foam.nanos.auth.token.Token',
  'foam.nanos.auth.token.TokenService',
  'foam.nanos.auth.token.ClientTokenService',
  'foam.nanos.auth.token.AbstractTokenService',
  'foam.nanos.auth.email.EmailTokenService',
  'foam.nanos.auth.email.EmailDocService',
  'foam.nanos.auth.email.EmailDocInterface',
  'foam.nanos.auth.email.ClientEmailDocService',
  'foam.nanos.auth.resetPassword.ResetPasswordTokenService',
  'foam.nanos.auth.PreventDuplicateEmailDAO',
  'foam.nanos.auth.PermissionedPropertyDAO',
  'foam.nanos.auth.HidePropertiesSink',
  'foam.nanos.auth.ServiceProvider',
  'foam.nanos.auth.twofactor.OTPAuthService',
  'foam.nanos.auth.twofactor.AbstractOTPAuthService',
  'foam.nanos.auth.twofactor.AbstractTOTPAuthService',
  'foam.nanos.auth.twofactor.ClientOTPAuthService',
  'foam.nanos.auth.twofactor.GoogleTOTPAuthService',
  'foam.nanos.auth.LogoutDisabledUserDAO',
  'foam.nanos.auth.DeletedAware',
  'foam.nanos.auth.DeletedAwareDummy',
  'foam.nanos.auth.DeletedAwareDAOTest',
  'foam.nanos.auth.Language',
  'foam.nanos.auth.Region',
  'foam.nanos.cron.Cron',
  'foam.nanos.http.HttpParameters',
  'foam.nanos.http.DefaultHttpParameters',
  'foam.nanos.session.Session',
  'foam.nanos.pool.AbstractFixedThreadPool',
  'foam.nanos.pm.PMInfo',
  'foam.nanos.logger.LogLevel',
  'foam.nanos.logger.LogMessage',
  'foam.nanos.logger.LogLevelFilterLogger',
  'foam.nanos.logger.AbstractLogger',
  'foam.nanos.logger.DAOLogger',
  'foam.nanos.logger.FileLogger',
  'foam.nanos.logger.Logger',
  'foam.nanos.logger.NotificationLogMessageDAO',
  'foam.nanos.logger.RepeatLogMessageDAO',
  'foam.nanos.logger.ProxyLogger',
  'foam.nanos.logger.LogsView',
  'foam.nanos.menu.Menu',
  'foam.nanos.menu.DAOMenu',
  'foam.nanos.menu.DocumentMenu',
  'foam.nanos.menu.DocumentFileMenu',
  'foam.nanos.menu.LinkMenu',
  'foam.nanos.menu.ListMenu',
  'foam.nanos.menu.MenuBar',
  'foam.nanos.menu.PopupMenu',
  'foam.nanos.menu.SubMenu',
  'foam.nanos.menu.SubMenuView',
  'foam.nanos.menu.TabsMenu',
  'foam.nanos.menu.ViewMenu',
  'foam.nanos.mrac.AccessMode',
  'foam.nanos.mrac.ClusterConfig',
  'foam.nanos.mrac.ClusterClientDAO',
  'foam.nanos.mrac.ClusterDAO',
  'foam.nanos.mrac.ClusterRequest',
  'foam.nanos.mrac.ClusterResponse',
  'foam.nanos.mrac.ClusterServerDAO',
  'foam.nanos.mrac.NodeType',
  'foam.nanos.mrac.Status',
  'foam.nanos.notification.email.EmailMessage',
  'foam.nanos.notification.email.EmailService',
  'foam.nanos.notification.email.EmailTemplate',
  'foam.nanos.notification.email.SMTPEmailService',
  'foam.nanos.notification.email.ClientEmailService',
  'foam.nanos.notification.email.NullEmailService',
  'foam.nanos.notification.email.DAOEmailService',
  'foam.nanos.notification.email.SMTPEmailMessageDAO',
  'foam.nanos.notification.email.POP3Email',
  'foam.nanos.notification.email.ClientPOP3EmailService',
  'foam.nanos.notification.push.PushService',
  'foam.nanos.notification.push.FirebasePushService',
  'foam.nanos.notification.Notification',
  'foam.nanos.notification.NotificationTemplateDAO',
  'foam.nanos.notification.notifications.ScriptRunNotification',
  'foam.nanos.script.Language',
  'foam.nanos.script.Script',
  'foam.nanos.script.TestRunnerScript',
  'foam.nanos.test.Test',
  'foam.dao.history.PropertyUpdate',
  'foam.dao.history.HistoryRecord',
  'foam.dao.FixedSizeDAO',
  'foam.mop.MOP',
  'foam.u2.Element',
  'foam.u2.ControllerMode',
  'foam.u2.ElementState',
  'foam.u2.DefaultValidator',
  'foam.u2.DisplayMode',
  'foam.u2.Visibility',
  'foam.nanos.export.ExportDriverRegistry',
  'foam.dao.pg.ConnectionPool',
  'foam.lib.Outputter',
  'foam.lib.parse.Parser',
  'foam.lib.parse.PStream',
  'foam.lib.json.OutputJSON',
  'foam.lib.json.OutputterMode',
  'foam.lib.json.UnknownFObject',
  'foam.lib.json.UnknownFObjectArray',
  'foam.lib.json.ClassReferenceParserTest',
  'foam.lib.xml.OutputXML',
  'foam.blob.Blob',
  'foam.blob.BlobService',
  'foam.blob.AbstractBlob',
  'foam.blob.AbstractBlobService',
  'foam.blob.SubBlob',
  'foam.blob.IdentifiedBlob',
  'foam.blob.BlobStore',

  'foam.nanos.geocode.GoogleMapsAddressComponent',
  'foam.nanos.geocode.GoogleMapsCoordinates',
  'foam.nanos.geocode.GoogleMapsGeocodeResponse',
  'foam.nanos.geocode.GoogleMapsGeocodeResult',
  'foam.nanos.geocode.GoogleMapsGeometry',
  'foam.nanos.geocode.GoogleMapsBoundary',

  'foam.nanos.demo.DemoObject',
  'foam.nanos.demo.relationship.Student',
  'foam.nanos.demo.relationship.Professor',
  'foam.nanos.demo.relationship.Course',
  'foam.nanos.demo.relationship.CourseType',
  'foam.nanos.demo.relationship.StudentCourseJunction',
  'foam.nanos.fs.File',

  'foam.crypto.hash.Hasher',
  'foam.crypto.hash.HashableTest',

  'foam.crypto.sign.Signer',
  'foam.crypto.sign.SignableTest',

  'foam.nanos.http.Command',
  'foam.nanos.http.Format',
  'foam.nanos.http.DefaultHttpParameters',
  'foam.nanos.http.HttpParameters',
  'foam.nanos.dig.DIG',
  'foam.nanos.dig.DUG',
  'foam.nanos.dig.SUGAR',

  'foam.nanos.jetty.HttpServer',
  'foam.nanos.servlet.Servlet',
  'foam.nanos.servlet.ServletMapping',
  'foam.nanos.servlet.ErrorPageMapping',
  'foam.nanos.servlet.FilterMapping',
  'foam.nanos.servlet.VirtualHostRoutingServlet',

  'foam.lib.query.TestModel',
  'foam.lib.query.FooEnum',

  'foam.parse.QueryParserUserTest',
  'foam.util.EmailTest',
  'foam.util.PasswordTest',
  'foam.util.SecurityUtilTest',
  'foam.test.TestObj',
  'foam.core.FObjectTest',

  'foam.nanos.dig.exception.DigErrorMessage',
  'foam.nanos.dig.exception.DAONotFoundException',
  'foam.nanos.dig.exception.ParsingErrorException',
  'foam.nanos.dig.exception.DAOPutException',
  'foam.nanos.dig.exception.EmptyDataException',
  'foam.nanos.dig.exception.UnsupportException',
  'foam.nanos.dig.exception.UnknownIdException',
  'foam.nanos.dig.exception.DigSuccessMessage',
  'foam.flow.Document',
  'foam.flow.DocumentationFolderDAO',

  'foam.nanos.ruler.Rule',
  'foam.nanos.ruler.RulerDAO',
  'foam.nanos.ruler.Operations',
  'foam.nanos.ruler.RuleAction',
  'foam.nanos.ruler.ScriptPredicate',
  'foam.nanos.ruler.RuleHistory',
  'foam.nanos.ruler.RuleHistoryStatus',
  'foam.comics.SearchMode',

  //Support Files
  'foam.support.model.TicketMessage',
  'foam.support.model.SupportEmail',
  'foam.support.model.Ticket',

  'foam.nanos.dig.exception.EmptyParameterException',
  'foam.nanos.dig.exception.GeneralException'
];

var abstractClasses = [
  'foam.nanos.menu.AbstractMenu',
//  'foam.json.Outputter'
];


var skeletons = [
  'foam.dao.DAO',
  'foam.mop.MOP',
  'foam.nanos.auth.AuthService',
  'foam.nanos.auth.AgentAuthService',
  'foam.nanos.auth.email.EmailDocInterface',
  'foam.nanos.auth.twofactor.OTPAuthService',
  'foam.nanos.auth.token.TokenService',
  'foam.nanos.notification.email.EmailService',
  'foam.nanos.notification.email.POP3Email',
  'foam.nanos.notification.push.PushService',
  'foam.nanos.hello.HelloService'
];

var proxies = [
  'foam.dao.DAO',
  'foam.dao.Sink',
  'foam.mop.MOP',
  'foam.lib.Outputter',
  'foam.lib.parse.Parser',
  'foam.lib.parse.PStream',
  'foam.blob.Blob',
  'foam.blob.BlobService',
  'foam.nanos.auth.AuthService',
  'foam.nanos.auth.twofactor.OTPAuthService',
  'foam.nanos.http.WebAgent',
  'foam.nanos.notification.email.EmailService',
  'foam.nanos.notification.push.PushService'
];

var blacklist = [
  'foam.core.Property',
  'foam.mlang.expr.Mul',
  'foam.mlang.predicate.Func',
  'foam.u2.AttrSlot',
  'foam.u2.RenderSink',
  'foam.u2.ViewSpec',
];

module.exports = {
    classes: classes,
    abstractClasses: abstractClasses,
    skeletons: skeletons,
    proxies: proxies,
    blacklist: blacklist
};

'use strict';
define(['XGEN-Module', 'CommonMessage-Service', 'SessionStorage-Factory', 'Logger-Factory'], function () {
    angular.module('XGENModule').service('MessageService', ['$rootScope', 'LoggerFct', 'SignalRService',
        'SessionStorageFact', '$location', function ($rootScope, logger, SignalRService,
            SessionStorageFact, $location) {
            var service = {
                ApplicationAccessType: '',
                Start: StartService,
                LoginInfo: { isLogin: false, Resourcenumber: '' },
                ResourceList: {},
                IncidentList: {},
                SendRequest: SendRequest,
                GetRow: GetRowFromResource,
                LogOff: LogOff,
                Relogin: ReLogin,
                SendChatRequest: SendChatRequest,
                SendNCIC: SendNCIC,
                GetApplicationAccess: GetApplicationAccess,
                SetApplicationAccess: SetApplicationAccess
            };

            return service;

            function GetApplicationAccess()
            {
                return this.ApplicationAccessType;
            }

            function SetApplicationAccess(_value)
            {
               this.ApplicationAccessType = _value;
            }

            function StartService() {
                var l = SessionStorageFact.GetValue('userinfo');
                if (l != null) {
                    service.LoginInfo = l;
                }

                $rootScope.$on('LOGINFAIL', function (event, data) { MessageRecieved(event, data); });
                $rootScope.$on('LOGINPASS', function (event, data) { MessageRecieved(event, data); });

                $rootScope.$on('RESINI', function (event, msginit) { ResInitiate(msginit); });
                $rootScope.$on('INCINI', function (event, data) {
                    service.IncidentList = new kendo.data.DataSource({});
                    for (var i = 0; i < data.length; i++) {
                        service.IncidentList.add(data[i].Value);
                    }
                    $rootScope.$broadcast('REFINC', service.IncidentList);
                });
                $rootScope.$on('CONNECTION', function (event, data) { ConnectionChange(data) });
                $rootScope.$on('USERACTIVE', function (event, data) {
                    var crt = new Object();
                    crt.MsgType = 'Conenction';
                    service.SendRequest(crt);
                });
                $rootScope.$on('MESSAGE', function (event, msg) { $rootScope.$broadcast(msg.MessageNo, msg); });
                $rootScope.$on('ERROR', function (event, data) { logger.log(data.errorDescription, '', 'MessageService', true); });

            }

            function ResInitiate(msginit) {
                try {
                    if (msginit.length > 0) {
                        var msg;
                        service.ResourceList = new kendo.data.DataSource({ schema: { model: { id: 'Resourcenumber' } } });
                        for (var i = 0; i < msginit.length; i++) {
                            msg = msginit[i].Value;
                            if (msg.IncRecvDateTime != null && msg.IncRecvDateTime.length > 0) {
                                var sDate = new Date(Date.parse(msg.IncRecvDateTime, "MM/dd/yyyy HH:mm:ss"));
                                var seconds = Math.round((new Date() - sDate) / 1000);
                                msg.elapsetime = Math.round(seconds / 60);
                            }
                            service.ResourceList.add(msg);
                        }
                        //$location.path('/mobile/monitor/monitor');
                        //$rootScope.$apply();
                        $rootScope.$broadcast('REFRES', service.ResourceList);
                    }
                } catch (e) {
                    logger.logError("MessageRecieved:", e, 'MessageService', true);
                }
            }

            function MessageRecieved(event, data) {
                try {
                    if (event.name == 'LOGINFAIL') {
                        logger.log(data, '', '', true);
                        service.LoginInfo.isLogin = false;
                        service.LoginInfo.Resource = null;
                        SessionStorageFact.SetValue('userinfo', null);
                        $location.path('/');
                        return;
                    }
                    else if (event.name == 'LOGINPASS') {
                        data.isLogin = true;
                        SessionStorageFact.SetValue('userinfo', data);
                        service.LoginInfo = data;
                        if (data.IsXMobile) {
                            var crt = new Object();
                            crt.MsgType = 'Initial';
                            crt.MonitorType = 'LAW';
                            crt.Resourcenumber = service.LoginInfo.Resourcenumber;
                            service.SendRequest(crt);
                            $rootScope.$broadcast('952', service.LoginInfo);
                        }
                        $rootScope.$broadcast('LOGIN', service.LoginInfo);

                    }

                } catch (e) {
                    logger.logError("MessageRecieved:" + e, e, 'MessageService', true);
                }
            }

            function GetRowFromResource(dataSource, key, value) {
                for (var i = 0; i < dataSource.length; i++) {
                    if (dataSource[i][key] == value) {
                        return dataSource[i];
                    }
                }
                return null;
            }

            function SendRequest(Request) {
                try {

                    if (Request.Resourcenumber == null || Request.Resourcenumber.length <= 0)
                        Request.Resourcenumber = service.LoginInfo.Resourcenumber;
                    if (Request.PID == null || Request.PID.length <= 0)
                        Request.PID = service.LoginInfo.PIN;
                    //if (Workstation == null) {
                    //    Workstation = $.cookie('Workstation');
                    //}
                    if (service.LoginInfo.Resource != null)
                        Request.NoneCAD = service.LoginInfo.Resource.NoneCAD;
                    Request.MonitorType = 'LAW';
                    //crt.workstation = Workstation;

                    var newMessage = new Object();
                    newMessage.RequestMessage = Request;
                    newMessage.RequestType = 'CAD';

                    if (Request.MsgType == 'Login' || Request.MsgType == 'ReLogin' || Request.MsgType == 'Conenction' || Request.MsgType == 'LogOff')
                        newMessage.RequestType = Request.MsgType;

                    SignalRService.SendRequest(newMessage);

                } catch (e) {
                    logger.logError("SendRequest:" + e, e, 'MessageService', true);
                }
            }

            function SendChatRequest(Request) {
                try {

                    //if (Request.Resourcenumber == null || Request.Resourcenumber.length <= 0)
                    //    Request.Resourcenumber = service.LoginInfo.Resourcenumber;
                    if (Request.PID == null || Request.PID.length <= 0)
                        Request.PID = service.LoginInfo.PIN;
                    //if (Workstation == null) {
                    //    Workstation = $.cookie('Workstation');
                    //}
                    //if (service.LoginInfo.Resource != null)
                    //    Request.NoneCAD = service.LoginInfo.Resource.NoneCAD;
                    //Request.MonitorType = 'LAW';
                    //crt.workstation = Workstation;

                    var newMessage = new Object();
                    newMessage.RequestMessage = Request;
                    newMessage.RequestType = 'Chat';

                    //if (Request.MsgType == 'Login' || Request.MsgType == 'ReLogin' || Request.MsgType == 'Conenction' || Request.MsgType == 'LogOff')
                    //    newMessage.RequestType = Request.MsgType;

                    SignalRService.SendRequest(newMessage);

                } catch (e) {
                    logger.logError("SendRequest:" + e, e, 'MessageService', true);
                }
            }

            function LogOff(OffDutyStatus, msg) {
                if (OffDutyStatus == null || typeof OffDutyStatus == 'undefined') {
                    OffDutyStatus = false;
                }
                //  onlogoff();
                if (msg != '1') {
                    var crt = new Object();
                    crt.Messagenumber = 515;
                    crt.MsgType = 'LogOff';
                    crt.RequestId = (OffDutyStatus == true ? "Y" : "N");
                    if (parent.ActiveResource != null)
                        crt.NoneCAD = parent.ActiveResource.NoneCAD;
                    service.SendRequest(crt);
                }
                service.ResourceList = new kendo.data.DataSource({ schema: { model: { id: 'Resourcenumber' } } });
                parent.IncidentList = new kendo.data.DataSource({});
                service.LoginInfo = { isLogin: false, Resourcenumber: '' };
                SessionStorageFact.SetValue('userinfo', null);
                $(document).prop('title', 'XMOBILE - CONNECTED');
                $location.path('/');
                // $rootScope.$apply();.
                //openurl("LoginApp");
                $rootScope.$broadcast('LOGOFF', msg);
            }

            function ReLogin() {
                try {
                    if (service.LoginInfo != null && service.LoginInfo.isLogin) {
                        var crt = new Object();
                        crt.PID = service.LoginInfo.PIN;
                        crt.Resourcenumber = service.LoginInfo.Resourcenumber;
                        crt.MsgType = 'ReLogin';
                        crt.Password = '';
                        service.SendRequest(crt);
                    }
                    else {
                        $location.path('/');
                    }

                } catch (e) {
                    logger.logError("ReLogin:" + e, e, 'MessageService', true);
                }
            }

            function ConnectionChange(status) {
                if (status == 'connected')
                    service.Relogin();
            }

            function SendNCIC(Request) {
                try {

                    if (Request.PID == null || Request.PID.length <= 0)
                        Request.PID = service.LoginInfo.PIN;
                    //Request.Resourcenumber = service.LoginInfo.Resourcenumber;

                    Request.TerminalId = 'TN000001';
                    Request.ORI = 'TN000001';
                    Request.PIN = Request.userId = service.LoginInfo.PIN;
                    Request.PASSWORD = '';
                    Request.ResourceNo = service.LoginInfo.Resourcenumber;

                    var newMessage = new Object();
                    newMessage.RequestMessage = new Object();
                    newMessage.RequestType = 'NCIC';
                    newMessage.RequestMessage.NCICExportData = JSON.stringify(Request);
                    SignalRService.SendRequest(newMessage);

                } catch (e) {
                    logger.logError("SendRequest:" + e, e, 'MessageService', true);
                }
            }

        }]);
});
'use strict';
define(['Logger-Factory'], function () {
    angular.module('XGENModule').service('SignalRService', ['$rootScope', 'LoggerFct', 'commonConfig', function ($rootScope, LoggerFct, commonConfig) {
        var service = {
            Initialize: initialize,
            SendRequest: SendRequest,
            AddToGroup: AddToGroup,
            LeaveGroup: LeaveGroup
        };
        return service;

        var proxy = null;
        var conn = null;
        var IsConnnected = false;

        function initialize() {
            try {
                $.connection.hub.url = "http://" + commonConfig.config.HostName + "/XM/signalr";
                proxy = $.connection.messages;
                $.connection.hub.stateChanged(stateChanged);
                proxy.client.recievedMessage = recievedMessage;
                proxy.client.addMessage = addMessage;
                proxy.client.IsActive = IsActive;

                StartNewConnection();
            } catch (e) {
                LoggerFct.logError("SignalR initialize:" + e, e, 'SignalRService', true);
            }
        }

        function StartNewConnection() {
            try {
                $.connection.hub.start().done(function () {
                    ServerConnected();
                });
            } catch (e) {
                LoggerFct.logError("SignalR initialize:", e, 'SignalRService', true);
            }
        }

        function ServerConnected() {
            service.AddToGroup('LAW');
            service.AddToGroup('EMAIL');
            IsConnnected = true;
            clearInterval(conn);
            conn = null;
        }

        function AddToGroup(groupname) {
            proxy.server.join(groupname.toUpperCase());
        }

        function LeaveGroup(groupname) {
            proxy.server.leaveGroup(groupname.toUpperCase());
        }

        function SendRequest(m) {
            proxy.server.getMessage(JSON.stringify(m));
        }

        function stateChanged(change) {
            try {
                if (change.newState === $.signalR.connectionState.connecting) {
                    //LoggerFct.log('SignalR:Connecting', '', '', true);
                }
                else if (change.newState === $.signalR.connectionState.reconnecting) {
                    //LoggerFct.log('SignalR:reconnecting', '', '', true);
                }
                else if (change.newState === $.signalR.connectionState.connected) {
                    //LoggerFct.log('SignalR:connected', '', '', true);
                    $rootScope.$broadcast('CONNECTION', 'connected');
                }
                else if (change.newState === $.signalR.connectionState.disconnected) {
                    //LoggerFct.log('SignalR:disconnected', '', '', true);
                    IsConnnected = false;
                    if (conn == null)
                        conn = setInterval(StartNewConnection, 10000);
                }

            } catch (e) {
                LoggerFct.logError("SignalR stateChanged:", e, 'SignalRService', true);
            }
        }

        function addMessage(msg, msgno) {
            try {
                $rootScope.$broadcast(msg.MessageNo, msg);
            }
            catch (e) {
                LoggerFct.logError("SignalR addMessage:", e, 'SignalRService', true);
            }
        }

        function recievedMessage(Event, Message) {
            try {
                $rootScope.$broadcast(Event, Message);
            }
            catch (e) {
                LoggerFct.logError("SignalR addMessage:", e, 'SignalRService', true);
            }
        }

        function IsActive(connectionid) {
            proxy.server.updateUserStatus(connectionid);
        }

    }]);
});
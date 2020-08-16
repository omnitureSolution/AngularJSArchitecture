'use strict';
define(['XGEN-Module', 'Global-Factory', 'Sound-Service'], function () {
    angular.module('XGENModule').factory('ResourceMessageFact', ['$rootScope', 'LoggerFct', 'MessageService', 'GlobalFact', 'AjaxService', 'SoundService', function ($rootScope, LoggerFct, MessageService, GlobalFact, AjaxService, SoundService) {
        var service = {
            CheckforRacail: CheckforRacail,
            OpenRacialWindow: null
        };

        $rootScope.$on('083', function (event, data) { Process083(data); });
        $rootScope.$on('086', function (event, data) { UnAssignIncident(data);});
        $rootScope.$on('087', function (event, data) { DeleteUnAssignIncident(data); });

        return service;

        function Process083(msg) {
            try {
                if (!MessageService.LoginInfo.isLogin) return;
                if (msg.IsOffDuty) {
                    DeleteResource(msg);
                    return;
                }

                if (msg.IncRecvDateTime != null && msg.IncRecvDateTime.length > 0) {
                    var sDate = new Date(Date.parse(msg.IncRecvDateTime, "MM/dd/yyyy HH:mm:ss"));
                    var seconds = Math.round((new Date() - sDate) / 1000);
                    msg.elapsetime = Math.round(seconds / 60);
                }
                if (!msg.NoneCAD) {
                    var row = MessageService.GetRow(MessageService.ResourceList._data, "Resourcenumber", msg.Resourcenumber);
                    if (row != null) {
                        /*Start : Resource Update Beep*/
                        if (row.ResourceStatus != msg.ResourceStatus) {
                            SoundService.SoundForStatusUpdate(msg.Priority);
                        }
                        /*End : Resource Update Beep*/
                        $.each(row, function (field, value) {
                            try {
                                if (field != 'uid')
                                    row[field] = msg[field];
                            } catch (e) {
                            }
                        });
                    }
                    else {
                        MessageService.ResourceList.add(msg);
                    }
                }

                if (MessageService.LoginInfo.Resourcenumber.trim().toUpperCase() == msg.Resourcenumber.trim().toUpperCase()) {
                    try {
                        $rootScope.$broadcast('MYRESOURCE', msg);
                        if ((MessageService.LoginInfo.Resource == null || MessageService.LoginInfo.Resource.isUnAssign) && !msg.isUnAssign && !msg.isMisc) {
                            var soundstring = "Please attention, There is an incident assigned to you. Location is " + msg.CommonPlace + " " + msg.Location + "CFS is " + msg.CFS + " " + msg.CfsDesc;
                            SoundService.SoundForTextMessage(soundstring, msg.Resourcenumber, "IncidentInformation");
                        }
                        else {
                            if (MessageService.LoginInfo.Resource != null && !msg.isUnAssign && !msg.isMisc) {
                                var soundstring = "";
                                if (MessageService.LoginInfo.Resource.Location != msg.Location) {
                                    soundstring = " Changed Location " + msg.CommonPlace + " " + msg.Location;
                                }
                                if (MessageService.LoginInfo.Resource.CFS != msg.CFS) {
                                    soundstring = soundstring + " Changed CFS " + msg.CFS + " " + msg.CfsDesc;
                                }
                                if (soundstring != "") {
                                    SoundService.SoundForTextMessage(soundstring, msg.Resourcenumber, "IncidentInformation");
                                }
                            }
                        }
                        var julno = "";
                        if (MessageService.LoginInfo.Resource != null)
                            julno = MessageService.LoginInfo.Resource.JulianIncNo;
                        MessageService.LoginInfo.Resource = msg;
                        if (MessageService.LoginInfo.Resource != null && julno != msg.JulianIncNo) {
                            CheckforRacail(msg, false);
                        }
                        //  UpdateResourceDateTime = new Date();
                    }
                    catch (e) {
                        //alert(e);
                    }
                }
            } catch (e) {
            }
            $rootScope.$broadcast('UPDATERES', msg);
        }
        
        function CheckforRacail(msg, clear, callback) {
            if (service.MVStop == null) {
                GlobalFact.GetRegistrySetting('VehicleCFSCode', function (e) {
                    if (e != null) {
                        var aryCFS = e.split(';')
                        service.MVStop = aryCFS[1];
                        if (service.MVStop == MessageService.LoginInfo.Resource.CFS) {
                            CheckRacialProfile(clear, callback);
                        }
                    }
                });
            }
            else if (service.MVStop == msg.CFS) {
                CheckRacialProfile(clear, callback);
            }
        }

        function CheckRacialProfile(Clear, callback) {
            var params = new Object();
            params.CadNo = MessageService.LoginInfo.Resource.JulianIncNo;
            params.PID = MessageService.LoginInfo.PIN;
            var checkRacial = true;
            AjaxService.AjaxPost("CADDetails/GetPendingRacial", params, function (e) {
                if (e == null || e.length == 0) {
                    checkRacial = true;
                }
                else {
                    if (e.length > 0 || e == "Pending") {
                        if (Clear)
                            Clear = !confirm("Racial Profile has not been sent. Do you want to open Racial Profiling form ?");
                        if (!Clear) {
                            if (e.indexOf("Pending-") >= 0) {
                                var id = e.substring(8, e.length)
                                RacialOpen(true, id, "MvStop", "EDIT")
                                checkRacial = false;
                            }
                            else {
                                RacialOpen(true, MessageService.LoginInfo.Resource.JulianIncNo, "MvStop", "ADD")
                                checkRacial = false;
                            }
                        }
                        else
                            checkRacial = true;
                    }
                    else {
                        checkRacial = true;
                    }
                }
                if (callback != null) {
                    callback(checkRacial);
                }
            }, null);
        }

        function RacialOpen(refresh, param, functionality, option) {
            try {
                var url;
                GlobalFact.GetRegistrySetting("RacialProfilingRequired", function (e) {
                    service.OpenRacialWindow(refresh, param, functionality, option,e);
                });
            }
            catch (e) {
            }
        }

        function activeResourceStatus(SystemSettings) {
            if (SystemSettings != null) {
                setInterval(function () {
                    if (MessageService.LoginInfo.Resource != null && MessageService.LoginInfo.Resource.ResourceStatus != null) {
                        var seconds = Math.round((new Date() - UpdateResourceDateTime) / 1000);
                        var TimeDifference = Math.round(seconds / 60);
                        if (TimeDifference >= 5) {
                            var crt = new Object();
                            crt.Resourcenumber = MessageService.LoginInfo.Resource.Resourcenumber;
                            crt.ResourceStatus = MessageService.LoginInfo.Resource.ResourceStatus;
                            crt.ConnectionId = MessageService.LoginInfo.Resource.ConnectionId;
                            crt.MsgType = "ResourceStatus";
                            crt.Messagenumber = 29;
                            parent.SendMessage(crt);
                        }
                    }
                }, parseInt(SystemSettings));
            }
        }

        OfficerSafety = function (msg) {
            OfficerSafetyMaster(msg);
        }

        DeleteResource = function (msg) {
            try {
                if (msg.Resourcenumber == MessageService.LoginInfo.Resourcenumber) {
                    alert("You are forcefully offduty by administrator.");
                    LogOff();
                    return;
                }
                var itemToRemove = MessageService.GetRow(MessageService.ResourceList._data, "Resourcenumber", msg.Resourcenumber);
                if (itemToRemove != null)
                    MessageService.ResourceList.remove(itemToRemove);

                $rootScope.$broadcast('DELETERES', msg);
            }
            catch (e) {
            }
        };

        function UnAssignIncident(msg) {
            try {
                var v = "";
                var Updateitem = MessageService.GetRow(MessageService.IncidentList._data, "JulianIncNo", msg.JulianIncNo);
                if (Updateitem != null) {
                    Updateitem.IncRecvDateTime = msg.IncRecvDateTime;
                    Updateitem.CommonPlace = msg.CommonPlace;
                    Updateitem.CFS = msg.CFS;
                    Updateitem.JulianIncNo = msg.JulianIncNo;
                    Updateitem.Location = msg.Location;
                    Updateitem.AgencyCode = msg.AgencyCode;
                    Updateitem.Grid = msg.Grid;
                    Updateitem.CfsDesc = msg.CfsDesc;
                }
                else
                    MessageService.IncidentList.add(msg);

                $rootScope.$broadcast('REFINC', msg);
            } catch (e) {
            }
        };

        function DeleteUnAssignIncident(msg) {
            try {

                var itemToRemove = MessageService.GetRow(MessageService.IncidentList._data, "JulianIncNo", msg.JulianIncNo);
                if (itemToRemove != null)
                    MessageService.IncidentList.remove(itemToRemove);

                $rootScope.$broadcast('REFINC', msg);

            } catch (e) {
            }
        };

        function DisplayEmergency(msg) {
            EmergencyNotification(msg);
        }

        //SetButtonMaster();
        function GetRegbtnUnassignedIncident() {
            parent.GetRegistrySetting("EnableUnassignedIncidentDetail", function (e) {
                EnableButton($('#btnUnassignedIncident'), eval(e));
                //EnableButton($('#btnUnassignedIncident'), eval(e));
            });
        }

        function GetRegForCanUseNCIC() {
            parent.GetRegistrySetting("CanUseNCIC", function (e) {
                EnableButton($('#btnNCIC'), eval(e));
            });
        }

        //GetRegForRIStop();
        function GetRegForRIStop() {
            if (parent.isLogin) {
                parent.GetRegistrySetting("EnabledRI", function (e) {
                    EnableButton($('#btnGenerateCall'), eval(e));
                });
            }
        }
        //GetRegForMISCStatus();
        function GetRegForMISCStatus() {
            if (parent.isLogin) {
                parent.GetRegistrySetting("EnableMiscStatus", function (e) {
                    EnableButton($('#btnService'), eval(e));
                });
            }
        }

        function GetRegDisableBOLO() {
            if (parent.isLogin) {
                parent.GetRegistrySetting("DisableBOLO", function (e) {
                    EnableButton($('#btnBolo'), !eval(e));
                });
            }
        }

        function GetRegOfficerSafety() {
            if (parent.isLogin) {
                parent.GetRegistrySetting('EnableOfficerAlert', function (e) {
                    if (eval(e) == true)
                        $('#btnOSafety').show();
                    else
                        $('#btnOSafety').hide();
                });
            }
        }

        function EnableButton(btn, IsEnable) {
            try {
                btn[0].disabled = !IsEnable;
                if (IsEnable) {
                    btn.removeAttr("disabled").removeClass("k-state-disabled");
                }
                else {
                    btn.attr("disabled", true).addClass("k-state-disabled").removeClass("k-state-focused");
                }
            } catch (e) {
            }
        }


    }]);
});
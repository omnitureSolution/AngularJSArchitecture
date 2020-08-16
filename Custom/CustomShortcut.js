var elements = ["f1", "f2", "f3", "f4", "f6", "f7", "f8", "f9", "f10", "f11", "Ctrl+t", "Ctrl+r", "Ctrl+i", "Ctrl+g", "Ctrl+k", "Alt+l", "Shift+f1", "Alt+s", "Alt+o", "Alt+e", "Alt+f5", "Alt+f1"];
XmobileShortcut = {
    Add: function (DomElement) {
        DomElement.bind('keydown', elements[0], function assets() {
            document.onhelp = function () { return (false); }
            window.onhelp = function () { return (false); }
            parent.openurl("Monitor");
            return false;
        }); //F1(112)(Monitor)
        DomElement.bind('keydown', elements[1], function assets() {
            if (parent.ActiveResource != null && parent.ActiveResource.NoneCAD == false) {
                if ($("#btnGenerateCall").val() == 'Call Details') {
                    parent.openurl("ActiveCall");
                }
                else {
                    if (!parent.IsConnected) {
                        toastr.info(parent.OORMessage);
                        return false;
                    }
                    if (parent.ActiveResource.isMisc) {
                        parent.ViewMessage("You are currently in miscellaneous status, change status first. ");
                    }
                    else {
                        parent.openurl("GeneratedCall");
                    }
                }
            }
            return false;
        }); //F2(113)(Generate Call/Active Call)
        DomElement.bind('keydown', elements[2], function assets() {
            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return false;
            }
            if (parent.ActiveResource.isMisc) {
                parent.ViewMessage("You are currently in miscellaneous status, change status first. ");
                return false;
            }
            if (!$("#btnMVStop").is(":disabled") && $("#btnMVStop").is(":visible")) {
                parent.openurl("MVStop");
            }
            return false;
        }); //F3(114)(Vehicle Stop)
        DomElement.bind('keydown', elements[3], function assets() {
            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return false;
            }
            if (!$("#btnService").is(":disabled") && $("#btnService").is(":visible")) {
                $("#btnService").click();
            }
            return false;
        }); //F4(115)(Service)
        DomElement.bind('keydown', elements[4], function assets() {
            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return false;
            }
            if (!$("#btnStatus").is(":disabled") && $("#btnStatus").is(":visible")) {
                $("#btnStatus").click();
            }
            return false;
        }); //F6(117)(Ack/Arr/Clear)
        DomElement.bind('keydown', elements[5], function assets() {
            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return false;
            }
            parent.LoginToChat(parent.userPid);
            return false;
        }); //F7(118)(Chat)
        DomElement.bind('keydown', elements[6], function assets() {
            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return;
            }
            var objHasPass = new Object();
            objHasPass.UserPid = parent.userPid;
            try {
                var p = new Object();
                p.PIN = parent.userPid;
                var $injector = parent.angular.element(parent.$("#XMobileLaw")).injector();
                $injector.invoke(['XMobileLawFactory', function (XMobileLawFactory) {
                    XMobileLawFactory.getHasPasswordAndUserName(objHasPass).then(function (d) {
                        if (d.Message) {
                            toastr.error("GetHasPasswordAndUserNamee " + d.data.statusText);
                        }
                        else {
                            var url = d.data.d + "&AgencyName" + parent.ActiveResource.AgencyName;
                            var wind = window.open(url, "_blank", "toolbar=no, scrollbars=no, resizable=no, top=10, left=10, width=" + screen.width + ", height=" + screen.height + "");
                            wind.focus();
                        }
                    },
                   function (err) {
                       toastr.error(err);
                   });
                }]);
            }
            catch (ex) {
                toastr.error(ex);
            }
            return false;
        }); //F8(119)(RMS Search)
        DomElement.bind('keydown', elements[7], function assets() {
            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return;
            }
            if (!$("#btnBolo").is(":disabled") && $("#btnBolo").is(":visible")) {
                parent.openurl("Bolo");
            }

            return false;
        }); //F9(120)(Bolo)
        //DomElement.bind('keydown', elements[8], function assets() {
        //    parent.openurl("Home");
        //    return false;
        //});//F10(121)(Apps & Reports)
        DomElement.bind('keydown', elements[8], function assets() {

            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return;
            }

            parent.OpenNCICQuick();
            return false;
        });//F10(Quick Launch NCIC)
        DomElement.bind('keydown', elements[9], function assets() {
            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return;
            }
            parent.NCICOpen(false);
            return false;
        }); //F11(122)(NCIC Search)
        DomElement.bind('keydown', elements[10], function assets() {
            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return false;
            }
            else if ($('#UnassignIncident').data('kendoGrid') != null) {
                var grid = $("#UnassignIncident").data('kendoGrid');
                var dItem = grid.dataItem(grid.select());
                if (dItem != null && dItem.JulianIncNo != "") {
                    parent.openurl("PremiseHistory", dItem.Location, dItem.JulianIncNo);
                }
                else {
                    parent.openurl("PremiseHistory");
                }
            }
            else if ($('#resourceGrid').data('kendoGrid') != null) {
                var grid = $("#resourceGrid").data("kendoGrid");
                var dItem = grid.dataItem(grid.select());
                if (dItem != null && dItem.JulianIncNo != "") {
                    parent.openurl("PremiseHistory", dItem.ShortLocation, dItem.JulianIncNo);
                }
                else {
                    parent.openurl("PremiseHistory");
                }
            }
            else if (parent.ActiveResource.JulianIncNo != '') {
                parent.openurl("PremiseHistory", parent.ActiveResource.ShortLocation, parent.ActiveResource.JulianIncNo);
            }
            else {
                parent.openurl("PremiseHistory");
            }

            return false;
        });//Ctrl+T(Premise History)
        DomElement.bind('keydown', elements[11], function assets() {
            parent.openurl("UnitHistory");
            return false;
        });//Ctrl+R(Unit History)
        DomElement.bind('keydown', elements[12], function assets() {
            parent.openurl("UnassignedIncident");
            return false;
        });//Ctrl+I(Unassigned Incidents)
        DomElement.bind('keydown', elements[13], function assets() {
            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return;
            }
            if ($("#aGenerateCase") && $("#aGenerateCase").is(":visible")) {
                if (!parent.ActiveResource.isUnAssign) {
                    if (parent.ActiveResource.Case_nr != '') {
                        alert('RMS case number ' + parent.ActiveResource.Case_nr + ' already assigned to incident ' + parent.ActiveResource.JulianIncNo);
                        return;
                    }
                    var crt = new Object();
                    crt.Incidentnr = parent.ActiveResource.JulianIncNo;
                    crt.Messagenumber = 506;
                    crt.MsgType = 'GenerateIncident';
                    parent.SendMessage(crt);
                }
                else {
                    alert('You are currently not assigned to any incident');
                }
            }
            return false;
        });//Ctrl+G(Genarate Inc#)
        DomElement.bind('keydown', elements[14], function assets() {
            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return;
            }
            parent.openurl("CreateTask");
            return false;
        });//Ctrl+K(Task)
        DomElement.bind('keydown', elements[15], function assets() {

            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return;
            }

            parent.OpenAutoOffDuty();
            return false;
        });//Alt+L(Log Off)
        DomElement.bind('keydown', elements[16], function assets() {
            //XMobileHelpUR
            document.onhelp = function () { return (false); }
            window.onhelp = function () { return (false); }
            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return false;
            }
            GetRegistrySetting('XMobileHelpURL', function (e) {
                var url = e;
                var wind = window.open(url, "_blank", "toolbar=no, scrollbars=no, resizable=no, top=10, left=10, width=" + screen.width + ", height=" + screen.height + "");
                wind.focus();
            });
            return false;
        });//Shift+F1(Online Help)
        DomElement.bind('keydown', elements[17], function assets() {

            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return false;
            }
            if (!$("#btnSupervisor").is(":disabled") && $("#btnSupervisor").is(":visible")) {
                parent.openurl("Supervisor");
            }

            return false;
        });//Alt+s(Supervisor)
        DomElement.bind('keydown', elements[18], function assets() {

            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return false;
            }
            if (!$("#btnOSafety").is(":disabled") && $("#btnOSafety").is(":visible")) {
                $("#btnOSafety").click();
            }
            return false;
        });//Alt+o(Officer Alert)
        DomElement.bind('keydown', elements[19], function assets() {

            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return false;
            }
            if (!$("#btnEnroute").is(":disabled") && $("#btnEnroute").is(":visible")) {
                $("#btnEnroute").click();
            }
            return false;
        });//Alt+e(Home)
        DomElement.bind('keydown', elements[20], function assets() {

            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return false;
            }
            if (!$("#btnHome").is(":disabled") && $("#btnHome").is(":visible")) {
                $("#btnHome").click();
            }
            return false;
        });//Alt+f5(Enroute)
        DomElement.bind('keydown', elements[21], function assets() {

            if (!parent.IsConnected) {
                toastr.info(parent.OORMessage);
                return false;
            }
            if (parent.ActiveResource.isUnAssign) {
                parent.GetRegistrySetting("EmergencyButtonEnabled", function (e) {
                    if (e == "false")
                        return false;
                    else
                        CommonWindowPopup(250, "850", "Emergency", "../../Forms/Monitor/Emergency.html", "emgController", "");
                });


            }
            return false;
        });//Alt+f1(Emr)
    },
    Remove: function (DomElement) {
        DomElement.unbind("keydown");
    }
}

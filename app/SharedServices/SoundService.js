'use strict';
define(['XGEN-Module'], function (app) {
    angular.module('XGENModule').service('SoundService', ['GlobalFact', 'AjaxService', function (GlobalFact, AjaxService) {
        var service = {
            SoundForTextMessage: SoundForTextMessage,
            BeepSound: BeepSound,
            BoloBeepSound: BoloBeepSound,
            SoundForStatusUpdate: SoundForStatusUpdate
        }

        return service;

        function SoundForTextMessage(Soundstring, soundres, RegisteryName) {
            try {
                GlobalFact.GetRegistrySetting("DisableSound", function (e1) {
                    //if (eval(e1) != true) {
                    //    if (Soundstring != "") {
                    //        if (Soundstring == "BoloBeep") {
                    //            GlobalFact.GetRegistrySetting(RegisteryName, function (e1) {
                    //                if (eval(e1)) {
                    //                    service.BoloBeepSound();
                    //                }
                    //                else {
                    //                    service.BeepSound();
                    //                }
                    //            })
                    //        }
                    //        else {
                    //            GlobalFact.GetRegistrySetting(RegisteryName, function (e1) {
                    //                if (eval(e1)) {
                    //                    var params = { text: Soundstring, resouceNo: soundres.trim().toUpperCase() };
                    //                    AjaxService.AjaxPost("Common.asmx/ConvertTTS", params, function (d) {
                    //                        if (d.d != null && d.d == true) {
                    //                            var soundHandle = document.getElementById('soundHandle');
                    //                            soundHandle.src = "../../Sound/" + soundres.trim().toUpperCase() + ".mp3";
                    //                            soundHandle.play();
                    //                        }
                    //                        else {
                    //                            service.BeepSound();
                    //                        }
                    //                    });
                    //                }
                    //                else {
                    //                    service.BeepSound();
                    //                }
                    //            })
                    //        }
                    //    }
                    //}
                });
            }
            catch (e) {
            }
        }

        function BeepSound() {
            var soundHandle = document.getElementById('soundHandle');
            soundHandle.src = '../../Sound/DispatchBeep.mp3';
            soundHandle.play();
        }

        function BoloBeepSound() {
            var soundHandle = document.getElementById('soundHandle');
            soundHandle.src = '../../Sound/BoloBeep.mp3';
            soundHandle.play();
        }

        function SoundForStatusUpdate(msgPriority) {
            try {
                GlobalFact.GetRegistrySetting("DisableSound", function (e1) {
                    if (eval(e1) != true) {
                        GlobalFact.GetRegistrySetting("EnableMonitorStatusUpdateSound", function (e1) {
                            if (e1 != null && e1 != "") {
                                if (eval(e1) == 1) {
                                    service.BeepSound();
                                }
                                else if (eval(e1) == 2) {
                                    GlobalFact.GetRegistrySetting("HighPriorityCall", function (e1) {
                                        if (e1 != null && e1 != "" && e1.indexOf(msgPriority) > -1) {
                                            service.BeepSound();
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
            catch (e) { }
        }

    }]);
});

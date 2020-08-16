'use strict';
define(['Ajax-Service', 'Logger-Factory', 'Message-Service'], function () {
    angular.module('XGENModule').factory('GlobalFact',
            ['AjaxService', 'LoggerFct', 'MessageService', 'ValidationFct',
                function (AjaxService, LoggerFct, MessageService, ValidationFct) {
                    var service = {
                        ThemeID: 0,
                        AgencyProfile: null,
                        validationBG: '#FCEDC2',
                        regArray: [],
                        GetRegistrySetting: GetRegistrySetting,
                        CheckRacialProfile: CheckRacialProfile,
                        ValidateImageFile: ValidateFile,
                        ChangeTheme: ChangeTheme,
                        ChangeSystemTheme: ChangeSystemTheme,
                        ReteriveTheme: ReteriveTheme,
                        AgnecyFieldControls: AgnecyFieldControls,
                        AgeByDate: AgeByDate,
                        DateDiff: { inDays: inDays, inWeeks: inWeeks, inMonths: inMonths, inYears: inYears }
                    };
                    return service;

                    function GetRegistrySetting(RegName, callback) {

                        var result = $.grep(service.regArray, function (e) { return e.Key == RegName; });
                        if (result.length > 0) {
                            callback(result[0].Value);
                        }
                        else {
                            var param = new Object();
                            param.Key_Name = RegName;
                            param.PIN = MessageService.LoginInfo.PIN;
                            AjaxService.AjaxPost("ListTable/GetRegistryByKeyName", param, function (response, status) {
                                var r = new Object();
                                r.Key = RegName;
                                r.Value = response;
                                service.regArray.push(r);
                                try {
                                    callback(response);
                                }
                                catch (e) {
                                    LoggerFct.logError("[Catch : GetRegistrySetting]" + JSON.stringify(RegName), e, 'GlobalFact', true);
                                }
                            }, function (response) {
                                LoggerFct.logError("[Error : GetRegistrySetting]" + JSON.stringify(response), response, 'GlobalFact', true);
                            });
                        }
                    }

                    function CheckRacialProfile(params, callback) {
                        AjaxService.AjaxPost("CADDetails/GetPendingRacial", params, function (response, status) {
                            try {
                                callback(response);
                            }
                            catch (e) {
                                LoggerFct.logError("[Catch : CheckRacialProfile]", e, 'GlobalFact', true);
                            }
                        }, function (response) {
                            LoggerFct.logError("[Error : CheckRacialProfile]", response, 'GlobalFact', true);
                        });
                    }

                    function ValidateFile(filename, callback) {
                        var filenameExt = "";
                        var ImgExt = ["jpg", "jpeg", "gif", "bmp", "tif", "tiff", "png"];
                        if (filename != null && filename.length > 0) {
                            filenameExt = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
                            var result = $.grep(ImgExt, function (e) { return e == filenameExt; });
                            if (result.length > 0) {
                                callback(true);
                                return;
                            }
                        }
                        callback(false);
                    }

                    function ChangeTheme() {
                        service.ThemeID++;
                        service.ChangeSystemTheme();
                        var params = new Object();
                        params.userid = MessageService.LoginInfo.PIN;
                        params.SettingName = 'Theme'
                        params.Setting = service.ThemeID;
                        AjaxService.AjaxPost('FieldReport/SetUserSetting', params, function (e) {
                            LoggerFct.log("Theme Saved", null, 'GlobalFact', true);
                        }, function (e) {
                            LoggerFct.logError("Theme Not Saved", e, 'GlobalFact', true);
                        });
                    }

                    function ChangeSystemTheme() {
                        if (service.ThemeID == 0) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.blueopal.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 1) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.metroblack.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 2) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.metro.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 3) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.moonlight.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 4) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.silver.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 5) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.red.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 6) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.blue.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 7) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.black.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 8) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.highcontrast.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 9) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.rtl.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 10) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.uniform.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 11) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.fiori.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 12) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.material.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        if (service.ThemeID == 13) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.materialblack.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                        else if (service.ThemeID > 13) {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.blueopal.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                            service.ThemeID = 0;
                        }
                    }

                    function ReteriveTheme() {
                        var params = new Object();
                        params.UserPID = MessageService.LoginInfo.PIN;
                        if (MessageService.LoginInfo.PIN) {
                            AjaxService.AjaxPost('CADDetails/GetTheme', params, function (e) {
                                if (e != "" && e != null) {
                                    service.ThemeID = e;
                                    service.ChangeSystemTheme();
                                }
                                else {
                                    document.getElementById('KendoThemeCSS').href = 'styles/kendo.blueopal.min.css';
                                    document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                                }
                            }, function (e) {
                                LoggerFct.logError("GetTheme", e, 'GlobalFact', true);

                            });
                        }
                        else {
                            document.getElementById('KendoThemeCSS').href = 'styles/kendo.blueopal.min.css';
                            document.getElementById('CommonstyleCSS').href = 'styles/XGENWebAppCommon.css';
                        }
                    }

                    function AgnecyFieldControls(scope, result) {
                        for (var i = 0; i < result.length; i++) {
                            if (!scope.IsLoaded) {
                                if (result[i].Type == "0")
                                    $("#field-text").tmpl(result[i]).appendTo("#agency-specific-info");

                                if (result[i].Type == "2")
                                    $("#field-checkbox").tmpl(result[i]).appendTo("#agency-specific-info");

                                if (result[i].Type == "1") {
                                    $("#field-combobox").tmpl(result[i]).appendTo("#agency-specific-info");
                                    var source = [];
                                    $.each(result[i].ValueList, function () {
                                        source.push({ Text: this, Value: this });
                                    });

                                    scope.dataSourceOption[result[i].Field + "Option"] = {
                                        dataSource: source,
                                        dataTextField: "Text",
                                        dataValueField: "Value",
                                        change: function (event) {
                                            if (!ValidationFct.checkComboboxIndex(this.dataSource.view(), "Value", this.value())) {
                                                this.value(null);
                                                this.element.trigger("change");
                                            }
                                        }
                                    };
                                }
                                if (i > 0 && (i - 1) % 2 == 0) {
                                    $("<div style=\"clear:both;\"></div>").appendTo("#agency-specific-info");
                                }
                            }
                            scope.AgencyFieldInfo[result[i].Field] = (result[i].Type == "2" ? (result[i].Value == "Y" ? true : false) : result[i].Value);
                            scope.AgencyFieldInfo.ID = result[i].ID;
                        }
                    }

                    function AgeByDate(MinDate, MaxDate) {
                        var age = service.DateDiff.inYears(MinDate, MaxDate);
                        if (age > 0) {
                            return { age: age, Code: "Y" }
                        }
                        age = service.DateDiff.inMonths(MinDate, MaxDate);
                        if (age > 0) {
                            return { age: age, Code: "M" }
                        }
                        age = service.DateDiff.inWeeks(MinDate, MaxDate);
                        if (age > 0) {
                            return { age: age, Code: "W" }
                        }
                        age = service.DateDiff.inDays(MinDate, MaxDate);
                        if (age > -1) {
                            return { age: age, Code: "D" }
                        }
                        return null;
                    }

                    function inDays(MinDate, MaxDate) {
                        var t2 = MaxDate.getTime();
                        var t1 = MinDate.getTime();
                        if (MinDate.getMonth() === MaxDate.getMonth() && MinDate.getFullYear() === MaxDate.getFullYear()) {
                            var DayDiff = MaxDate.getDate() - MinDate.getDate()
                            if (DayDiff < 0)
                                return DayDiff;
                        }
                        return parseInt((t2 - t1) / (24 * 3600 * 1000));
                    }

                    function inWeeks(MinDate, MaxDate) {
                        var DiffInDay = service.DateDiff.inDays(MinDate, MaxDate);
                        return parseInt(DiffInDay / 7);
                    }

                    function inMonths(MinDate, MaxDate) {
                        var DiffInDay = service.DateDiff.inDays(MinDate, MaxDate);
                        return parseInt(DiffInDay / 30);
                    }

                    function inYears(MinDate, MaxDate) {
                        var DiffInDay = service.DateDiff.inDays(MinDate, MaxDate)
                        if (DiffInDay < 365)
                            return 0
                        else
                            return parseInt((DiffInDay / 365))

                    }

                }]);
});
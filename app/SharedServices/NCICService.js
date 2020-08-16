'use strict';
define(['Ajax-Service',  'Message-Service'], function () {
    angular.module('XGENModule').service('NCICService', ['AjaxService', 'LoggerFct', 'MessageService', function (AjaxService, LoggerFct, MessageService) {
        var service = {
            GetNcicComboState: GetNcicComboState,
            GetNcicReasonCode: GetNcicReasonCode,
            GetNcicComboSex: GetNcicComboSex,
            GetNcicComboRace: GetNcicComboRace,
            GetNCICWPInqType: GetNCICWPInqType,
            GetNcicComboMnu: GetNcicComboMnu,
            GetNcicComboLIY: GetNcicComboLIY,
            GetNcicComboVMA: GetNcicComboVMA,
            GetNcicComboArticle: GetNcicComboArticle,
            GetNcicComboArticleDesc: GetNcicComboArticleDesc,
            GetNcicComboSIT: GetNcicComboSIT,
            GetNcicComboLIT: GetNcicComboLIT,
            GetColorForNCIC: GetColorForNCIC,
            GetNcicCombodentype: GetNcicCombodentype,
            GetNcicCombosecuritytype: GetNcicCombosecuritytype,
            GetNcicComboGun: GetNcicComboGun,
            GetNcicComboPurpose: GetNcicComboPurpose,
            NCICOpen: NCICOpen,
            NCICClose: NCICClose,
            GetLast24Response: GetLast24Response,
            NCICParsing: NCICParsing,
            GetExportInfo: GetExportInfo
        }
        return service;

        function GetNcicComboState(successFunction) {

            var params = new Object();
            params.lstListFile = 'States';
            params.display = 2;
            AjaxService.AjaxPost("CADDetails/GetNcicComboState", params, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicReasonCode(successFunction) {

            var paramReasonCode = new Object();
            paramReasonCode.lstListFile = 'canreason';
            paramReasonCode.display = 2;


            AjaxService.AjaxPost("CADDetails/GetNcicComboState", paramReasonCode, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicComboSex(successFunction) {

            var params = new Object();
            params.lstListFile = 'sex';
            params.display = 1;

            AjaxService.AjaxPost("CADDetails/GetNcicComboState", params, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicComboRace(successFunction) {
            var params = new Object();
            params.lstListFile = 'race';
            params.display = 2;
            AjaxService.AjaxPost("CADDetails/GetNcicCombo", params, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });

        }
        function GetNCICWPInqType(successFunction) {

            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'NCICWPInqType';
            paramNCIC.display = 2;

            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicComboMnu(successFunction) {
            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'MNU';
            paramNCIC.display = 2;
            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicComboLIY(successFunction) {

            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'LIT';
            paramNCIC.display = 2;
            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicComboVMA(successFunction) {

            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'VMA';
            paramNCIC.display = 2;

            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicComboArticle(successFunction) {

            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'Article';
            paramNCIC.display = 0;

            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicComboArticleDesc(successFunction) {

            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'Article';
            paramNCIC.display = 1;

            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicComboSIT(successFunction) {

            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'SIT';
            paramNCIC.display = 2;

            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicComboLIT(successFunction) {

            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'LIT';
            paramNCIC.display = 2;

            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetColorForNCIC(successFunction) {
            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'Color';
            paramNCIC.display = 2;
            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicCombodentype(successFunction) {
            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'dentype';
            paramNCIC.display = 0;
            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicCombosecuritytype(successFunction) {
            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'securitytype';
            paramNCIC.display = 2;

            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicComboGun(successFunction) {

            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'Gun';
            paramNCIC.display = 2;

            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetNcicComboPurpose(successFunction) {

            var paramNCIC = new Object();
            paramNCIC.lstListFile = 'Purpose';
            paramNCIC.display = 2;
            AjaxService.AjaxPost("CADDetails/GetNcicCombo", paramNCIC, function (response, status) {
                successFunction(response);

            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function NCICOpen(refresh) {
            //if (MessageService.LoginInfo.ResourceORI == '' || MessageService.LoginInfo.ResourceORI == null) {
            //    return;
            //}
            var dialog = $("#divNCIC").data("kendoWindow")
            var state = 'TN';//MessageService.LoginInfo.ResourceORI.substr(0, 2).toUpperCase();
            var url = "views/NCIC/TN/TNNCICMain.aspx";

            if (dialog == null || typeof dialog == 'undefined') {
                dialog = $('#divNCIC').kendoWindow({

                    width: $(window).width() - 10,
                    height: $(window).height() - 10,
                    content: url,
                    modal: false,
                    resizable: false,
                    title: false,
                    iframe: true,
                    visible: false
                });

                $("#divNCIC").closest(".k-window").css({
                    top: 55,
                    left: 50
                });

                $("#divNCIC").find(".k-window-action").css("visibility", "hidden");
            }
            else {
                if (refresh) {
                    dialog.refresh({ url: url });
                }
            }
            if (!refresh) {
                $('#divNCIC').data("kendoWindow").center();
                $('#divNCIC').data("kendoWindow").open();
            }
        }
        function NCICClose() {
            $('#divNCIC').data("kendoWindow").close();
        }
        function GetLast24Response(params, successFunction) {
            AjaxService.AjaxPost("CADDetails/GetLast24Response", params, function (response, status) {
                if (response != null && response != "")
                    successFunction(response, status);
            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function NCICParsing(params, successFunction) {
            AjaxService.AjaxPost("CADDetails/NCICParsing", params, function (response, status) {
                if (response != null && response != "")
                    successFunction(response, status);
            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
        function GetExportInfo(params,successFunction)
        {
            AjaxService.AjaxPost("CADDetails/Export", params, function (response, status) {
                if (response != null && response != "")
                    successFunction(response, status);
            }, function (response) {
                LoggerFct.logError("[Error]", response, 'NCICService', true);
            });
        }
    }]);
});



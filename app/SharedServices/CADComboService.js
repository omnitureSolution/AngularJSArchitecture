'use strict';
define(['XGEN-Module', 'Ajax-Service', 'Logger-Factory'], function () {
    angular.module('XGENModule').service('CADComboService', ['AjaxService', 'LoggerFct', function (AjaxService, LoggerFct) {
        var service = {
            GetCFSCode: GetCFSCode,
            GetSexType: GetSexType,
            GetRaceType: GetRaceType,
            GetStateCode: GetStateCode,
            GetPlateTypeCode: GetPlateTypeCode,
            GetPropertydesc: GetPropertydesc,
            GetVehMake: GetVehMake,
            GetVehModel: GetVehModel,
            GetVehStyle: GetVehStyle,
            GetColor: GetColor
        }
        return service;

        function GetCFSCode(objParam, successFunction) {
            AjaxService.AjaxPost("ListTable/GetCADCFSList", objParam, function (response, status) {
                if (response != null) {
                    successFunction(response, status);
                }
            }, function (response) {
                LoggerFct.logError("GetCADCFSList" + JSON.stringify(response), JSON.stringify(response), 'CADComboService', true);
            });
        }
        function GetSexType(objParam, successFunction) {
            AjaxService.AjaxPost("ListTable/GetSexTypeList", objParam, function (response, status) {
                if (response != null) {
                    successFunction(response, status);
                }
            }, function (response) {
                LoggerFct.logError("GetSexTypeList" + JSON.stringify(response), JSON.stringify(response), 'CADComboService', true);
            });
        }
        function GetRaceType(objParam, successFunction) {
            AjaxService.AjaxPost("ListTable/GetNameRaceTypeList", objParam, function (response, status) {
                if (response != null) {
                    successFunction(response, status);
                }
            }, function (response) {
                LoggerFct.logError("GetNameRaceTypeList" + JSON.stringify(response), JSON.stringify(response), 'CADComboService', true);
            });
        }
        function GetStateCode(objParam, successFunction) {
            AjaxService.AjaxPost("ListTable/GetStateList", objParam, function (response, status) {
                if (response != null) {
                    successFunction(response, status);
                }
            }, function (response) {
                LoggerFct.logError("GetStateList" + JSON.stringify(response), JSON.stringify(response), 'CADComboService', true);
            });
        }
        function GetPlateTypeCode(objParam, successFunction) {
            AjaxService.AjaxPost("ListTable/GetPropertyVehiclePlateTypeList", objParam, function (response, status) {
                if (response != null) {
                    successFunction(response, status);
                }
            }, function (response) {
                LoggerFct.logError("GetPropertyVehiclePlateTypeList" + JSON.stringify(response), JSON.stringify(response), 'CADComboService', true);
            });
        }
        function GetPropertydesc(objParam, successFunction) {
            AjaxService.AjaxPost("ListTable/GetPropertyDescriptionCodesList", objParam, function (response, status) {
                if (response != null) {
                    successFunction(response, status);
                }
            }, function (response) {
                LoggerFct.logError("GetPropertyDescriptionCodesList" + JSON.stringify(response), JSON.stringify(response), 'CADComboService', true);
            });
        }
        function GetVehMake(objParam, successFunction) {
            AjaxService.AjaxPost("ListTable/GetPropertyVehicleMakeList", objParam, function (response, status) {
                if (response != null) {
                    successFunction(response, status);
                }
            }, function (response) {
                LoggerFct.logError("GetPropertyVehicleMakeList" + JSON.stringify(response), JSON.stringify(response), 'CADComboService', true);
            });
        }
        function GetVehModel(objParam, successFunction) {
            AjaxService.AjaxPost("ListTable/GetPropertyVehicleModelList", objParam, function (response, status) {
                if (response != null) {
                    successFunction(response, status);
                }
            }, function (response) {
                LoggerFct.logError("GetPropertyVehicleModelList" + JSON.stringify(response), JSON.stringify(response), 'CADComboService', true);
            });
        }
        function GetVehStyle(objParam, successFunction) {
            AjaxService.AjaxPost("ListTable/GetPropertyVehicleStyleList", objParam, function (response, status) {
                if (response != null) {
                    successFunction(response, status);
                }
            }, function (response) {
                LoggerFct.logError("GetPropertyVehicleStyleList" + JSON.stringify(response), JSON.stringify(response), 'CADComboService', true);
            });
        }
        function GetColor(objParam, successFunction) {
            AjaxService.AjaxPost("ListTable/GetStandardColorList", objParam, function (response, status) {
                if (response != null) {
                    successFunction(response, status);
                }
            }, function (response) {
                LoggerFct.logError("GetStandardColorList" + JSON.stringify(response), JSON.stringify(response), 'CADComboService', true);
            });
        }
    }]);
});



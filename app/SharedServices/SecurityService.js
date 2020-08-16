'use strict';
define(['XGEN-Module'], function () {
    angular.module('XGENModule').service('SecurityService', ['LoggerFct', 'MessageService',
        'AjaxService', function (logger, MessageService,
             AjaxService) {
            var service = {
                Encrypt: Encrypt,
                Decrypt: Decrypt,
                GetScreenRights: GetScreenRights,
                Key: 'SecuitServce0000'
            };

            return service;

            function Encrypt(data) {
                var key = CryptoJS.enc.Utf8.parse(service.Key);
                var iv = CryptoJS.enc.Utf8.parse(service.Key);

                var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });

                return encryptedlogin.toString();

            }

            function Decrypt(data) {

            }

            function GetScreenRights(ScreenCode, resultfun) {
                var param = new Object();
                param.PINID = MessageService.LoginInfo.PINID;
                param.AgencyID = MessageService.LoginInfo.AgencyId;
                param.FormName = ScreenCode;
                AjaxService.AjaxPost('Security/GetScreenPermission', param, function (e) {
                    var result= e;
                    for (var i = 0; i < e.length; i++) {
                        result[e[i].ScreenCode.trim()] = e[i];
                        result[e[i].ScreenCode.trim()].CanSave = true;
                    }
                    resultfun(result);
                }, function (e) {
                    logger.logError('SecurityService:' + e, '', '', true);
                });
            }



        }]);
});
'use strict';

define(['XGEN-Module'], function () {
    angular.module('XGENModule').factory('ValidationFct', ['$rootScope', '$filter', '$injector', function ($rootScope, $filter, $injector) {
        var service = {
            checkComboboxIndex: checkComboboxIndex,
            checkBlankValidation: checkBlankValidation,
            checkvalidDatetime: checkvalidDatetime
        };
        return service;

        function checkComboboxIndex(values, key, keyValue) {
            var result = false;
            if (values && key && keyValue) {
                //var findRes = $filter('filter')(values, { [key]: keyValue });
                var findRes = $.grep(values, function (i) {
                    return i[key] == keyValue.toString()
                });
                if (findRes.length > 0) {
                    result = true;
                }
            }
            return result;
        }

        function checkBlankValidation(modelValue) {
            var result = false;
            if (modelValue) {
                result = true;
            }
            return result;
        }

        function checkvalidDatetime(text) {
            var result = false;
            if (!text) {
                return result;
            }
            var splitdateTime = text.toString().split(' ');

            if (splitdateTime[1]) {
                var regexp = /[02][0-3]:[0-5][0-9]:[0-5][0-9]/;
                var correct = (splitdateTime[1].search(regexp) >= 0) ? true : false;
                if (!correct) {
                    return result;
                }
            }
            var comp = splitdateTime[0].toString().split('/');
            var m = parseInt(comp[0], 10);
            var d = parseInt(comp[1], 10);
            var y = parseInt(comp[2], 10);
            var date = new Date(y, m - 1, d);
            if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
                result = true;
            }
            return result;
        }

    }]);
});
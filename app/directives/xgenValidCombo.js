﻿'use strict';
define(['app'], function (app) {
    app.register.directive('xgenValidCombo', function ($timeout, $parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                element.bind("blur", function (e) {
                    //debugger;
                    if ((element.val() && !(parseInt(ctrl.$$rawModelValue) > 0)) || element.getKendoComboBox().selectedIndex === -1) {
                            ctrl.$setViewValue("");
                            ctrl.$render();
                        }
                });
            }
        }
    });
    app.register.directive('xgenValidMultipleEmails', function () {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

        function validateAll(ctrl, validatorName, value) {
            var validity = ctrl.$isEmpty(value) || value.split(';').every(
                function (email) {
                    return EMAIL_REGEXP.test(email.trim());
                }
            );

            ctrl.$setValidity(validatorName, validity);
            return validity ? value : undefined;
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function postLink(scope, elem, attrs, modelCtrl) {
                function multipleEmailsValidator(value) {
                    return validateAll(modelCtrl, 'xgenValidMultipleEmails', value);
                };

                modelCtrl.$formatters.push(multipleEmailsValidator);
                modelCtrl.$parsers.push(multipleEmailsValidator);
            }
        };
    });
});
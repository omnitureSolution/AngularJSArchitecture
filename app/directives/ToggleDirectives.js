'use strict';
define(['app'], function (app) {
    app.register.directive('slideToggle', function () {
        return function (scope, elem, attrs) {
            elem.click(function () {
                elem.next().slideToggle();
            });
        };
    });

    app.register.directive('addressVerification', function () {
        return function (scope, elem, attrs) {
            function UpdateListData() {
                elem.AddressVerification($("#" + attrs.chknonverify), $("#" + attrs.btnpluslocation), JSON.parse(attrs.newAddress));
            }

            attrs.$observe('newAddress', function (objnewAddress) {
                if (objnewAddress != null) {
                    UpdateListData();
                }
            });
        };
    });
});

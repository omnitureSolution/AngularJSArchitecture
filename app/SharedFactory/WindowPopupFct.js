'use strict';
define(['XGEN-Module','kendo-all','kendo-window'], function () {
    angular.module('XGENModule').factory('WindowPopupFct', ['$window', '$kWindow', '$q', function ($window, $kWindow, $q) {
        var service = {
            CommonWindowPopup: CommonWindowPopup,
            CommonWindowPopupAMD: CommonWindowPopupAMD
        };
        return service;

        function CommonWindowPopup(height, width, title, url, controller, other) {
            var windowInstance = $kWindow.open({
                modal: true,
                height: height,
                class:'k-block',
                width: width,
                resizable: false,
                title: title,
                center: true,
                templateUrl: url,
                controller: controller,
                resolve: {
                    message: function () {
                        return other;
                    }
                }
            });
            return windowInstance;
        }

        function CommonWindowPopupAMD(height, width, title, url, LoadService, other) {
            var deferred = $q.defer();
            var controllerPath = url.substr(0, url.lastIndexOf(".")) + "Ctrl";
            var windowInstance;
            if (LoadService)
            {
                var servicePath = url.substr(0, url.lastIndexOf(".")) + "Service";
                require([servicePath], function () {
                    require([controllerPath], function () {
                        var response = service.CommonWindowPopup(height, width, title, url, controllerPath.substr(controllerPath.lastIndexOf("/") + 1, controllerPath.lenght), other);
                        deferred.resolve(response);
                    });
                });
            }
            else {
                require([controllerPath], function () {
                    var response = service.CommonWindowPopup(height, width, title, url, controllerPath.substr(controllerPath.lastIndexOf("/") + 1, controllerPath.lenght), other);
                    deferred.resolve(response);
                   
                });
            }
            return deferred.promise;
        }
    }]);
});
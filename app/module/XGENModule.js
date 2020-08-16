'use strict';
define([], function () {
    var commonModule = angular.module('XGENModule', []);
    commonModule.provider('commonConfig', function () {
        this.config = {
           
        };
        this.$get = function () {
            return {
                config: this.config
            };
        };
    });
    return commonModule;
});
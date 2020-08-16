'use strict';
define(['XGEN-Module'], function () {
    angular.module('XGENModule').factory('SessionStorageFact', ['$cookieStore', function ($cookieStore) {
        var service = {
            SetValue: SetValue,
            GetValue: GetValue,
            RemoveValue: RemoveValue
        };
        return service;

        function SetValue(key,value)
        {
            $cookieStore.put(key, value);
        }

        function GetValue(key) {
            return $cookieStore.get(key);
        }

        function RemoveValue(key)
        {
            $cookieStore.remove(key);
        }
    }]);
});
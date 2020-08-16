'use strict';
define(['XGEN-Module', 'Logger-Factory', 'Message-Service'], function (app) {
    angular.module('XGENModule').factory('AjaxService', ['$rootScope', '$q', '$http', 'commonConfig', 'LoggerFct', 'MessageService', function ($rootScope,$q, $http, commonConfig, LoggerFct, MessageService) {

        var service = {
            AjaxPost: AjaxPost,
            AjaxGet: AjaxGet,
            AjaxPut: AjaxPut,
            AjaxDelete: AjaxDelete,
            AgencyPost: AgencyPost,
            AgencyGet: AgencyGet,
            AgencyPut: AgencyPut,
            AgencyDelete: AgencyDelete,
            AgencyURL: commonConfig.config.BaseURLForFactory,
            AjaxPostMap: AjaxPostMap,
            AgencySearchResult: AgencySearchResult,
            AgencyUpload : AgencyUpload
        };
        return service;

        //#region Base URL

        function AjaxPost(route, data, successFunction, errorFunction) {
            $rootScope.showloader = true;
            $http.defaults.headers.post['UserPIN'] = MessageService.LoginInfo.PIN
            $http.defaults.headers.post['UserID'] = MessageService.LoginInfo.PINID;
            $http.defaults.headers.post['AgencyID'] = MessageService.LoginInfo.AgencyId;
            $http.post(commonConfig.config.BaseURLForFactory + route, data, { headers: { 'Content-Type': 'application/json' } })
            .success(function (response, status, headers, config) {
                $rootScope.showloader = false;
                successFunction(response, status);
            })
            .error(function (response) {
                $rootScope.showloader = false;
                if (errorFunction) {
                    errorFunction(response);
                }
                else {
                    LoggerFct.logError("AjaxPost" + JSON.stringify(response), JSON.stringify(response), 'AjaxService', true);
                }
            });
        }

        function AjaxGet(route, data, successFunction, errorFunction) {
            $rootScope.showloader = true;
            $http.get(commonConfig.config.BaseURLForFactory + route, data, { headers: { 'Content-Type': 'application/json' } })
            .success(function (response, status, headers, config) {
                $rootScope.showloader = false;
                successFunction(response, status);
            })
            .error(function (response) {
                $rootScope.showloader = false;
                if (errorFunction) {
                    errorFunction(response);
                }
                else {
                    LoggerFct.logError("AjaxGet" + JSON.stringify(response), JSON.stringify(response), 'AjaxService', true);
                }
            });
        }

        function AjaxPut(route, data, successFunction, errorFunction) {

            $rootScope.showloader = true;
            $http.put(commonConfig.config.BaseURLForFactory + route, data)
            .success(function (response, status, headers, config) {
                $rootScope.showloader = false;
                successFunction(response, status);
            })
            .error(function (response) {
                $rootScope.showloader = false;
                if (errorFunction) {
                    errorFunction(response);
                }
                else {
                    LoggerFct.logError("AjaxPut" + JSON.stringify(response), JSON.stringify(response), 'AjaxService', true);
                }
            });
        }

        function AjaxDelete(route, data, successFunction, errorFunction) {
            $rootScope.showloader = true;
            $http.delete(commonConfig.config.BaseURLForFactory + route, data, { headers: { 'Content-Type': 'application/json' } })
            .success(function (response, status, headers, config) {
                $rootScope.showloader = false;
                successFunction(response, status);
            })
            .error(function (response) {
                $rootScope.showloader = false;
                if (errorFunction) {
                    errorFunction(response);
                }
                else {
                    LoggerFct.logError("AjaxDelete" + JSON.stringify(response), JSON.stringify(response), 'AjaxService', true);
                }
            });
        }

        //#endregion Base URL

        // #region Agency URL Methods

        function getUrl(route) {
            var url = '';
            if (route.toUpperCase().trim().indexOf('HTTP') == 0)
                url = route;
            else
                url = service.AgencyURL + route;
            return url;
        }

        function AgencyPost(route, data, successFunction, errorFunction) {
            var url = getUrl(route);
            $rootScope.showloader = true;
            $http.defaults.headers.post['UserPIN'] = MessageService.LoginInfo.PIN
            $http.defaults.headers.post['UserID'] = MessageService.LoginInfo.PINID;
            $http.defaults.headers.post['AgencyID'] = MessageService.LoginInfo.AgencyId;
            $http.post(url, data, { headers: { 'Content-Type': 'application/json' } })
            .success(function (response, status, headers, config) {
                $rootScope.showloader = false;
                successFunction(response, status);
            })
            .error(function (response) {
                $rootScope.showloader = false;
                if (errorFunction) {
                    errorFunction(response);
                }
                else {
                    LoggerFct.logError("AgencyPost" + JSON.stringify(response), JSON.stringify(response), 'AjaxService', true);
                }
            });
        }

        function AgencyGet(route, data, successFunction, errorFunction) {
            var url = getUrl(route);
            $rootScope.showloader = true;
            $http.get(url, data, { headers: { 'Content-Type': 'application/json' } })
            .success(function (response, status, headers, config) {
                $rootScope.showloader = false;
                successFunction(response, status);
            })
            .error(function (response) {
                $rootScope.showloader = false;
                if (errorFunction) {
                    errorFunction(response);
                }
                else {
                    LoggerFct.logError("AgencyGet" + JSON.stringify(response), JSON.stringify(response), 'AjaxService', true);
                }
            });
        }

        function AgencyPut(route, data, successFunction, errorFunction) {
            $rootScope.showloader = true;
            $http.put(getUrl(route), data)
            .success(function (response, status, headers, config) {
                $rootScope.showloader = false;
                successFunction(response, status);
            })
            .error(function (response) {
                $rootScope.showloader = false;
                if (errorFunction) {
                    errorFunction(response);
                }
                else {
                    LoggerFct.logError("AgencyPut" + JSON.stringify(response), JSON.stringify(response), 'AjaxService', true);
                }
            });
        }

        function AgencyDelete(route, data, successFunction, errorFunction) {
            $rootScope.showloader = true;
            $http.delete(getUrl(route), data, { headers: { 'Content-Type': 'application/json' } })
            .success(function (response, status, headers, config) {
                $rootScope.showloader = false;
                successFunction(response, status);
            })
            .error(function (response) {
                $rootScope.showloader = false;
                if (errorFunction) {
                    errorFunction(response);
                }
                else {
                    LoggerFct.logError("AgencyDelete" + JSON.stringify(response), JSON.stringify(response), 'AjaxService', true);
                }
            });
        }

        function AjaxPostMap(route, data, successFunction, errorFunction) {
            $rootScope.showloader = true;
            $http.post(route, data, { headers: { 'Content-Type': 'application/json' } })
            .success(function (response, status, headers, config) {
                $rootScope.showloader = false;
                successFunction(response, status);

            })
            .error(function (response) {
                $rootScope.showloader = false;
                if (errorFunction) {
                    errorFunction(response);
                }
                else {
                    LoggerFct.logError("AjaxPostMap" + JSON.stringify(response), JSON.stringify(response), 'AjaxService', true);
                }
            });
        }

        //#endregion 

        function AgencySearchResult(URLS, Params, success,error) {
            $rootScope.showloader = true;
            var deferred = $q.defer();
            var urlCalls = [];
            angular.forEach(URLS, function (url) {
                urlCalls.push($http.post(url, Params, { headers: { 'Content-Type': 'application/json' } }));
            });

            $q.all(urlCalls).then(function (results) {
                deferred.resolve(results);
                success(results);
                $rootScope.showloader = false;
            },
          function (errors) {
              deferred.reject(errors);
              error(errors);
              $rootScope.showloader = false;
          });
            
        }

        function AgencyUpload(route, data, successFunction, errorFunction) {
            var url = getUrl(route);
            $rootScope.showloader = true;
            $http.defaults.headers.post['UserPIN'] = MessageService.LoginInfo.PIN
            $http.defaults.headers.post['UserID'] = MessageService.LoginInfo.PINID;
            $http.defaults.headers.post['AgencyID'] = MessageService.LoginInfo.AgencyId;
            $http.post(url, data, {
                headers: {
                    transformRequest: angular.identity,
                    'Content-Type': undefined 
                }
            })
            .success(function (response, status, headers, config) {
                $rootScope.showloader = false;
                successFunction(response, status);
            })
            .error(function (response) {
                $rootScope.showloader = false;
                if (errorFunction) {
                    errorFunction(response);
                }
                else {
                    LoggerFct.logError("AgencyPost" + JSON.stringify(response), JSON.stringify(response), 'AjaxService', true);
                }
            });
        }

    }]);
});

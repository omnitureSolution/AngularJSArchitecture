'use strict';
define(['angularAMD', 'Root-Ctrl', 'XmobileTop-Ctrl', 'XRMSTop-Ctrl',
    'angular-route', 'angular-resource', 'angular-sanitize', 'angular-cookies',
    'Common-Factory', 'Validation-Factory',
    'kendo-all', 'kendo-window', 'CheckList-Module', 'HtmlCompile-Module', 'CssInjector-Module', 'UtilsMasks-Module'],
    function (angularAMD, RootCtrl, XmobileTopCtrl, XRMSTopCtrl) {

        var app = angular.module('ArchonixApp', ['ngRoute', 'ngResource', 'ngSanitize', 'ngCookies', 'kendo.window', 'kendo.directives', 'XGENModule', 'checklist-model', 'angular-bind-html-compile', 'angular.css.injector', 'ui.utils.masks']);

        //#region Set Value
        var events = {
            controllerActivateSuccess: 'controller.activateSuccess',
        };
        var config = {
            appErrorPrefix: '[XRMS Error] ',
            docTitle: 'XRMS Application',
            events: events,
            BaseURLForFactory: $("#APIURL").val(),
            HostName: $("#HostName").val()
        };
        app.value('config', config);
        //#endregion Set Value

        //#region Configuration of $logProvider
        app.config(['$logProvider', function ($logProvider) {
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
        }]);
        //#endregion Configuration of $logProvider

        //#region Configuration of commonConfigProvider
        app.config(['commonConfigProvider', function (cfg) {
            cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
            cfg.config.BaseURLForFactory = config.BaseURLForFactory;
            cfg.config.HostName = config.HostName;

        }]);
        //#endregion Configuration of commonConfigProvider

        //#region Configuration of $provide
        app.config(['$provide', function ($provide) {
            $provide.decorator('$exceptionHandler', ['$delegate', 'config', 'LoggerFct', function extendExceptionHandler($delegate, config, LoggerFct) {
                var appErrorPrefix = config.appErrorPrefix;
                var logError = LoggerFct.getLogFn('app', 'error');
                return function (exception, cause) {
                    $delegate(exception, cause);
                    if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) { return; }
                    var errorData = { exception: exception, cause: cause };
                    var msg = appErrorPrefix + exception.message + '\n' + exception.stack;
                    var msg = appErrorPrefix + exception.message;
                    logError(msg + JSON.stringify(errorData), errorData, true);
                };
            }]);
        }]);
        //#endregion Configuration of $provide

        //#region $httpProvider of $provide
        app.config(function ($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        });
        //#endregion $httpProvider of $provide

        //#region $routeProvider of $provide
        function LoadCtrl($q, $rootScope, $location, CommonFct) {

            var path = $location.path();
            var loadController = "views" + path + "ctrl";
            var loadService = "views" + path + "Service";
            if (!CommonFct.MessageService.LoginInfo.isLogin || CommonFct.appSession.GetValue("XmobileOrXRMS") == null || CommonFct.appSession.GetValue("XmobileOrXRMS") == "Login") {
                $location.path("/");
            }
            var deferred = $q.defer();
            require([loadService], function () {
                require([loadController], function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
            }, function () {
                require([loadController], function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
            });
            return deferred.promise;
        }
        app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when("/", angularAMD.route({
                    templateUrl: function (rp) { return 'views/login.html'; },
                    controllerUrl: "views/LoginCtrl"
                }))
                .when("/dashboard", angularAMD.route({
                    templateUrl: function (rp) { return 'views/dashboard.html'; },
                    controllerUrl: "views/DashboardCtrl"
                }))
                 .when("/:section/:tree", angularAMD.route({
                     templateUrl: function (rp) { return 'views/' + rp.section + '/' + rp.tree + '.html'; },
                     resolve: {
                         load: ['$q', '$rootScope', '$location', 'CommonFct', function ($q, $rootScope, $location, CommonFct) {
                             return LoadCtrl($q, $rootScope, $location, CommonFct);
                         }]
                     }
                 }))
                .when("/:default/:section/:tree", angularAMD.route({

                    templateUrl: function (rp) { return 'views/' + rp.default + "/" + rp.section + '/' + rp.tree + '.html'; },
                    resolve: {
                        load: ['$q', '$rootScope', '$location', 'CommonFct', function ($q, $rootScope, $location, CommonFct) {
                            return LoadCtrl($q, $rootScope, $location, CommonFct);
                        }]
                    }
                }))
                .when("/:default/:section/:state/:tree", angularAMD.route({
                    templateUrl: function (rp) { return 'views/' + rp.default + "/" + rp.section + "/" + rp.state + '/' + rp.tree + '.html'; },
                    resolve: {
                        load: ['$q', '$rootScope', '$location', 'CommonFct', function ($q, $rootScope, $location, CommonFct) {
                            return LoadCtrl($q, $rootScope, $location, CommonFct);
                        }]
                    }
                }))
                .otherwise({ redirectTo: '/' });
        }]);
        //#endregion $routeProvider of $provide

        //#region toastr Setting
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
        //#endregion toastr Setting

        //#region Top XMobile
        XmobileTopCtrl.$inject = ['$scope', '$route', '$rootScope', 'CommonFct', '$location', '$http'];
        app.controller("XmobileTopCtrl", XmobileTopCtrl);
        //#endregion Top XMobile

        //#region Top RMS
        XRMSTopCtrl.$inject = ['$scope', '$rootScope', '$location', 'CommonFct', '$filter', '$injector', 'ValidationFct', '$route', '$timeout'];
        app.controller("XRMSTopCtrl", XRMSTopCtrl);
        //#endregion Top RMS

        //#region Root Controller
        RootCtrl.$inject = ['$scope', '$sce', '$rootScope', '$http', '$location', 'config', 'CommonFct'];
        app.controller("RootCtrl", RootCtrl);
        //#endregion Root Controller

        //#region Bootstrap Application
        angularAMD.bootstrap(app);
        //#endregion Bootstrap Application

        return app;

    });





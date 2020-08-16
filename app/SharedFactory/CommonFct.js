'use strict';

define(['SignalR-Service', 'WindowPopup-Factory', 'ResourceMessage-Factory', 'Security-Service', 'CADCombo-Service', 'NCIC-Service', 'ComboDatasource-Service', 'ApplicationSettings-Service', 'Inputmask-Directive'], function () {
    angular.module('XGENModule').factory('CommonFct',
        ['$q', '$location', '$rootScope', 'commonConfig', 'LoggerFct', 'WindowPopupFct', 'SessionStorageFact', 'AjaxService', 'SignalRService', 'MessageService', 'ResourceMessageFact', 'GlobalFact', 'SecurityService', 'CADComboService', 'NCICService', 'ComboDatasourceService', 'ApplicationSettingsService', function (
          $q, $location, $rootScope, commonConfig, LoggerFct, WindowPopupFct, SessionStorageFact, AjaxService, SignalRService, MessageService, ResourceMessageFact, GlobalFact, SecurityService, CADComboService, NCICService, ComboDatasourceService, ApplicationSettingsService) {
            var service = {
                $location: $location,
                activateController: activateController,
                logger: LoggerFct, // for accessibility
                commonWindow: WindowPopupFct,
                appSession: SessionStorageFact,
                AjaxService: AjaxService,
                SignalRService: SignalRService,
                MessageService: MessageService,
                ResourceMessageFact: ResourceMessageFact,
                GlobalService: GlobalFact,
                SecurityService: SecurityService,
                CADComboService: CADComboService,
                NCICService: NCICService,
                ComboDatasourceService: ComboDatasourceService,
                ApplicationSettingsService: ApplicationSettingsService,
                OpenLstTableManager: OpenLstTableManager
            };
            return service;

            function activateController(promises, controllerId) {
                return $q.all(promises).then(function (eventArgs) {
                    var data = { controllerId: controllerId };
                    $broadcast(commonConfig.config.controllerActivateSuccessEvent, data);
                });
            }

            function $broadcast() {
                return $rootScope.$broadcast.apply($rootScope, arguments);
            }

            function OpenLstTableManager(listTable, lstManagerCallBack) {
                require(["Views/RMS/ListTableManager/ListTableManagerService"], function () {
                    require(["Views/RMS/ListTableManager/ListTableManagerCtrl"], function () {
                        lstManagerCallBack(WindowPopupFct.CommonWindowPopup(700, "950", "Table Manager List", "Views/RMS/ListTableManager/ListTableManager.html", "ListTableManagerCtrl", { params: { ListTable: listTable } }));
                    });
                });
            }

        }]);
});
'use strict';
define(['app'], function (app) {
    app.register.directive('xgenLoadreport', function () {
        return {
            link: function (scope, elem, attrs) {
                var json = {};
                json.reportType = scope.allparams.Reporttype;
                json.data = scope.allparams.Criteria;
                try {
                    elem.telerik_ReportViewer({
                        serviceUrl: scope.Reportserviceurl,
                        templateUrl: scope.Reporttemplateurl,
                        reportSource: {
                            report: JSON.stringify(json),
                            parameters: scope.allparams.parameters
                        },
                        viewMode: telerikReportViewer.ViewModes.PRINT_PREVIEW,
                        scaleMode: telerikReportViewer.ScaleModes.SPECIFIC,
                        scale: 1.0,
                        ready: function () {
                            scope.allparams.ParentInstance.close();
                        },
                    });
                }
                catch (ex) {

                }
            }
        }
    });
});
/*
Reporttype
Criteria
parameters
*/
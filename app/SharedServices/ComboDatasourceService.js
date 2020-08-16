'use strict';
define(['Ajax-Service'], function () {
    angular.module('XGENModule').service('ComboDatasourceService', ['AjaxService', function (AjaxService) {
        var service = {
            GetDataSource: GetDataSource
        };
        return service;


        function GetDataSource(path, objData) {
            var url;
            if (path.toUpperCase().indexOf('HTTP') == 0)
                url = path;
            else
                url = AjaxService.AgencyURL + path;

            return new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: url + "&$inlinecount=allpages",
                        type: "GET",
                        beforeSend: function (request) {
                            request.setRequestHeader('AgencyID', JSON.parse(localStorage.getItem('AgencyID')));
                            request.setRequestHeader('IsActive', JSON.parse(localStorage.getItem('IsActive')));
                            request.setRequestHeader('FilterID', JSON.parse(localStorage.getItem('FilterID')));
                            request.setRequestHeader('RankID', JSON.parse(localStorage.getItem('RankID')));
                        },
                        data: objData,
                        cache: false,
                        dataType: "json"
                    },
                    parameterMap: function (options, type) {
                        var paramMap = kendo.data.transports.odata.parameterMap(options);
                        delete paramMap.$inlinecount; // <-- remove inlinecount parameter.
                        delete paramMap.$format; // <-- remove format parameter.
                        if (options.filter == undefined || options.filter.filters == null || options.filter.filters.length == 0) {
                            delete paramMap.$filter;
                        }
                        return paramMap;
                    }
                },
                schema: {
                    data: function (data) {
                        if (data.Items) {
                            return data.Items;
                        }

                        return [data];
                    },
                    total: function (data) {
                        return data.Count;
                    }
                },
                pageSize: (objData.height / objData.itemHeight) * 4,
                serverPaging: true,
                serverFiltering: true
            });
        }

    }]);
});
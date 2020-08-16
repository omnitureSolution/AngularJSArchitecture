'use strict';
define(['app'], function (app) {
    app.register.directive('controlConfig', ['$compile', '$filter', function ($compile, $filter) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                function UpdateControlInfo() {
                    try {
                        if (scope.Controls != null && scope.Controls[attrs.controlConfig] != null) {
                            var item = scope.Controls[attrs.controlConfig];
                            if (item != null) {
                                if (!item.IsShow) {
                                    element.addClass("ng-hide");
                                }
                                else {
                                    element.removeClass("ng-hide");
                                    element.find('.klabel').text(item.LabelText);
                                }
                                if (item.IsRequired && item.IsShow) {
                                    if (element.find('input,select', 'textarea').length > 0) {
                                        if (scope.color != null) {
                                            element.find('input,select,textarea')[0].style.backgroundColor = scope.color;
                                            if (element.find("div .k-multiselect-wrap").length > 0) {
                                                element.find('div .k-multiselect-wrap')[0].style.backgroundColor = scope.color;
                                            }
                                        }
                                        else {
                                            element.find('input,select,textarea').addClass('reqField');
                                            if (element.find("div .k-multiselect-wrap").length > 0) {
                                                element.find('div .k-multiselect-wrap').addClass('reqField');
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                Apply_Color(attrs.controlConfig);
                            }
                        }
                        else {
                            var key = element.find('.klabel').text();
                            var len = String(key).length;
                            var Searchkey;
                            var item;
                            var a = [];

                            Apply_Color(attrs.controlConfig);

                            if ($(element)[0].className.indexOf('k-grid') > 0) {
                                a = $(element).find(".k-header");
                            }
                            if (a.length > 0) {
                                for (var i = 0; i < a.length; i++) {
                                    Searchkey = a[i].innerText;
                                    item = scope.FieldControls[Searchkey];
                                    if (item == null) {
                                        if (String(key).substr(len - 1, 1) == ':' || String(key).substr(len - 1, 1) == '#') {
                                            Searchkey = String(key).substr(0, len - 1);
                                        }
                                        item = scope.FieldControls[Searchkey];
                                        if (item == null) {
                                            Searchkey = String(Searchkey).trim();
                                            item = scope.FieldControls[Searchkey];
                                            if (item == null) {
                                                Searchkey = String(a[i].innerHTML) + ':';
                                                item = scope.FieldControls[Searchkey];
                                                Searchkey = String(a[i].innerHTML);
                                                if (item == null) {
                                                    Searchkey = String(a[i].innerHTML) + '#';
                                                    item = scope.FieldControls[Searchkey];
                                                    Searchkey = String(a[i].innerHTML);
                                                    if (item == null) {
                                                        Searchkey = String(a[i].innerHTML) + ' ';
                                                        item = scope.FieldControls[Searchkey];
                                                        Searchkey = String(a[i].innerHTML);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (item != null) {
                                        a[i].innerHTML = String(a[i].innerHTML).replace(Searchkey, item.DisplayName);
                                    }
                                }
                            }
                            else {
                                Searchkey = String(key);
                                item = scope.FieldControls[Searchkey];
                                if (item == null) {
                                    if (String(key).substr(len - 1, 1) == ':' || String(key).substr(len - 1, 1) == '#') {
                                        Searchkey = String(key).substr(0, len - 1);
                                    }
                                    item = scope.FieldControls[Searchkey];
                                    if (item == null) {
                                        Searchkey = String(Searchkey).trim();
                                        item = scope.FieldControls[Searchkey];
                                        if (item == null) {
                                            Searchkey = String(key) + ':';
                                            item = scope.FieldControls[Searchkey];
                                            Searchkey = String(key);
                                            if (item == null) {
                                                Searchkey = String(key) + '#';
                                                item = scope.FieldControls[Searchkey];
                                                Searchkey = String(key);
                                                if (item == null) {
                                                    Searchkey = String(key) + ' ';
                                                    item = scope.FieldControls[Searchkey];
                                                    Searchkey = String(key);
                                                }
                                            }
                                        }
                                    }
                                }
                                if (item != null) {
                                    key = String(key).replace(Searchkey, item.DisplayName);
                                    element.find('.klabel').text(key);
                                }
                            }
                        }
                        if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                            scope.$apply();
                        }
                    } catch (ex) { }
                }
                function Apply_Color(key) {
                    if (element.find('input,select', 'textarea').length > 0) {
                        var Fields = "ReportedDate,OccurredFromDate,OccurredToDate,CrimeLocation,RMSCFS,Last,ReasonCode,Type";
                        if (Fields.indexOf(key) > -1) {
                            if (scope.color != null) {
                                if (element.find('textarea').length > 0)
                                    element.find('textarea')[0].style.background = scope.color;
                                else
                                    element.find('input,select')[0].style.backgroundColor = scope.color;
                                if (element.find("div .k-multiselect-wrap").length > 0) {
                                    element.find('div .k-multiselect-wrap')[0].style.backgroundColor = scope.color;
                                }
                            }
                            else {
                                element.find('input,select,textarea').addClass('reqField');
                                if (element.find("div .k-multiselect-wrap").length > 0) {
                                    element.find('div .k-multiselect-wrap').addClass('reqField');
                                }
                            }
                        }
                    }
                }
                attrs.$observe('isload', function (value) {
                    if (value == "true") {
                        UpdateControlInfo();
                    }
                    else {
                        Apply_Color(attrs.controlConfig);
                    }
                });
            },
        }
    }]);
});
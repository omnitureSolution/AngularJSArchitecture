'use strict';
define(['app'], function (app) {
    app.register.directive('fieldDirectory', ['$compile', '$filter', function ($compile, $filter) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {


                function UpdateControlInfo() {
		
                    var key = element.text(); 
                    var len = String(key).length;
                    var Searchkey;
                    var item;
                    var a=[];

                    if($(element)[0].className.indexOf('k-grid') > 0)
                    {
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
                                        Searchkey = String(a[i].innerText) + ':';

                                        item = scope.FieldControls[Searchkey];
                                        Searchkey = String(a[i].innerText);


                                        if (item == null) {
                                            Searchkey = String(a[i].innerText) + '#';

                                            item = scope.FieldControls[Searchkey];
                                            Searchkey = String(a[i].innerText);


                                            if (item == null) {
                                                Searchkey = String(a[i].innerText) + ' ';

                                                item = scope.FieldControls[Searchkey];
                                                Searchkey = String(a[i].innerText);
                                            }
                                        }
                                    }
                                }
                            }

                            if (item != null) {

                                a[i].innerHTML = String(a[i].innerText).replace(Searchkey, item.DisplayName);
                            }
                        }
                    }
                    else {

                        if (scope.FormName != null) {
                            Searchkey = scope.FieldControls.OriginalLableText
                        }
                        else {
                            Searchkey = String(key);
                        }

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
                            element.text(key);
                        }

                    }
                }

                attrs.$observe('isload', function (value) {
                    if (value == "true") {
                        UpdateControlInfo();
                    }
                });

            },
        }
    }]);
});

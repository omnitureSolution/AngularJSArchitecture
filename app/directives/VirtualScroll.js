'use strict';
define(['app'], function (app) {
    app.register.directive('virtualScroll', function () {
        return {
            restrict: 'A',
            scope : {
                distance: '=',
                load : '&'
            },
            link: function (scope, element, attrs) {
                var lastScrollTop = 0;
                element.on('scroll', function () {
                    var height = jQuery(this).height();
                    var scrollTop = jQuery(this).scrollTop();
                    var tableHeight = this.scrollHeight;
                    if (scrollTop > lastScrollTop) {
                        if (scrollTop / (tableHeight - height) > scope.distance) {
                            scope.load();
                        }
                    }
                    lastScrollTop = scrollTop;
                });
            },
        }
    });
});

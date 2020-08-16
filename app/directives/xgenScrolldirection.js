'use strict';
define(['app'], function (app) {
    app.register.directive('xgenScrolldirection', function () {
        return function (scope, elem, attrs) {
            if (attrs.xgenScrolldirection == "Left") {
                elem.bind('click', function () {
                    if ($('.scrolls').scrollLeft() > 0) {
                        $('.scrolls').animate({
                            scrollLeft: $('.scrolls').scrollLeft() - $('.scrolls').innerWidth()
                        }, 100);
                    }
                });
            } else {
                elem.bind('click', function () {
                    if ($('.scrolls').scrollLeft() + $('.scrolls').innerWidth() != $('.scrolls')[0].scrollWidth) {
                        $('.scrolls').animate({
                            scrollLeft: $('.scrolls').scrollLeft() + $('.scrolls').innerWidth()
                        }, 100);
                    }
                });
            }
        };
    });
});

define(['XGEN-Module'], function (commonModule) {
    commonModule.directive('xgenInputmask', function () {
        return function (scope, element, attrs) {
            element.inputmask(attrs.xgenInputmask);
        };
    });
});
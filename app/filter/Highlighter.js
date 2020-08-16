'use strict';
define(['XGEN-Module'], function () {
    angular.module('XGENModule', ['ngSanitize']).filter('Highlighter', ['$sce',  function ($sce) {
        return function (text, search) {
            if (search && text) text = text.replace(new RegExp('(' + search + ')', 'gi'),
              '<span class="highlighted">$1</span>')

            return $sce.trustAsHtml(text)
        }
    }])
});

(function() {
  'use strict';

  angular.module('app.core', [
    /*
     * Angular modules
     */
    'ngAnimate', 'ngRoute', 'ngCookies', 'ngSanitize', 'ngResource',
    'ngStorage',
    /*
     * Our reusable cross app code modules
     */
    'app.blocks',
    /*
     * 3rd Party modules
     */
    'ui.router', 'ui.bootstrap'
  ]);
})();

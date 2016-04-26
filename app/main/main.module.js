(function() {
  'use strict';

  angular.module('app.main', ['app.core', 'uiGmapgoogle-maps'])
  .config(config);

  function config(uiGmapGoogleMapApiProvider, $mdThemingProvider) {
    uiGmapGoogleMapApiProvider.configure({
      // key: 'AIzaSyDMJkYvf1EkVHYB6F9cmAXJ_vToikVevMo',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });

    $mdThemingProvider.theme('default')
    .dark()
    .primaryPalette('orange')
    .accentPalette('orange');
  }
})();

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name app
   * @description
   * # app
   *
   * Main module of the application.
   */
  angular
    .module('app', [
      'app.core',
      'app.main'
    ])
    .run(function(applicationTask) {
      applicationTask.init();
    });
})();

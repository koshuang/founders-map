(function() {
  'use strict';

  var core = angular.module('app.core');

  var config = {
    appErrorPrefix: '[app Error] ',
    appTitle: 'ImHere'
  };

  core.config(configure);

  configure.$inject = ['$logProvider', 'routerHelperProvider',
    'exceptionHandlerProvider'
  ];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider,
    exceptionHandlerProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({
      docTitle: config.appTitle + ': '
    });
  }

})();
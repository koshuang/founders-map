(function() {
  'use strict';

  var core = angular.module('app.core');

  var config = {
    appErrorPrefix: '[app Error] ',
    appTitle: 'ImHere'
  };

  core.config(configure);

  configure.$inject = ['$logProvider', 'routerHelperProvider',
    '$provide', 'exceptionHandlerProvider'
  ];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider,
    $provide, exceptionHandlerProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({
      docTitle: config.appTitle + ': '
    });

    $provide.decorator('$state', function($delegate, $rootScope) {
      $rootScope.$on('$stateChangeStart', function(event, state, params) {
        $delegate.next = state;
        $delegate.toParams = params;
      });
      return $delegate;
    });
  }

})();

(function() {

  'use strict';

  angular
    .module('app.main')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'main',
      config: {
        url: '/main',
        ncyBreadcrumb: {
          label: 'Home'
        },
        views: {
          '': {
            templateUrl: 'layout/main-layout.html'
          },
          'context@main': {
            templateUrl: 'main/main.html'
          }
        }
      }
    }];
  }
})();

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
        url: '/',
        abstract: true,
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
    }, {
      state: 'main.map',
      config: {
        url: '',
        ncyBreadcrumb: {
          label: 'Map'
        },
        views: {
          'main-context': {
            controller: 'MapController',
            templateUrl: 'main/map.html',
            controllerAs: 'vm'
          }
        }
      }
    }];
  }
})();

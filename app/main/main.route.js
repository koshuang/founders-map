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
        },
        resolve: {
          founders: founderResolver
        }
      }
    }, {
      state: 'main.import',
      config: {
        url: 'import',
        ncyBreadcrumb: {
          label: 'Import'
        },
        views: {
          'main-context': {
            controller: 'ImportController',
            templateUrl: 'main/import.html',
            controllerAs: 'vm'
          }
        },
        resolve: {
          founders: founderResolver
        }
      }
    }, {
      state: 'main.map',
      config: {
        url: 'map',
        ncyBreadcrumb: {
          label: 'Map'
        },
        views: {
          'main-context': {
            controller: 'MapController',
            templateUrl: 'main/map.html',
            controllerAs: 'vm'
          }
        },
        resolve: {
          founders: founderResolver
        }
      }
    }];
  }

  /* @ngInject */
  function founderResolver($state, $q, $timeout, founderManager) {
    if (founderManager.founders.length) {
      $timeout(function() {
        $state.go('main.map');
      });
    } else {
      $timeout(function() {
        $state.go('main.import');
      });
    }
  }
})();

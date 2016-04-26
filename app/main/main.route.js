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
            templateUrl: 'main/main.html',
            controller: 'MainController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          redirectResolver: redirectResolver
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
          redirectResolver: redirectResolver
        }
      }
    }, {
      state: 'main.fields-selector',
      config: {
        url: 'fields-selector',
        ncyBreadcrumb: {
          label: 'Field Selector'
        },
        views: {
          'main-context': {
            controller: 'FieldsSelectorController',
            templateUrl: 'main/fields-selector.html',
            controllerAs: 'vm'
          }
        },
        resolve: {
          redirectResolver: redirectResolver,
          /* @ngInject */
          founders: function($state, $q, $timeout, founderManager) {
            return founderManager.founders;
          }
        }
      }
    }, {
      state: 'main.list',
      config: {
        url: 'list',
        ncyBreadcrumb: {
          label: 'List'
        },
        views: {
          'list-context': {
            controller: 'ListController',
            templateUrl: 'main/list.html',
            controllerAs: 'vm'
          }
        },
        resolve: {
          redirectResolver: redirectResolver
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
          'map-context': {
            controller: 'MapController',
            templateUrl: 'main/map.html',
            controllerAs: 'vm'
          }
        },
        resolve: {
          redirectResolver: redirectResolver
        }
      }
    }];
  }

  /* @ngInject */
  function redirectResolver($state, $q, $timeout, founderManager) {
    if (!founderManager.foundersArray.length) {
      if ($state.name !== 'main.import') {
        $timeout(function() {
          $state.go('main.import');
        });
      }
    }
  }
})();

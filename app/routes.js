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
    .module('app')
    .run(function($rootScope, $state, routerHelper) {
      routerHelper.configureStates(getStates());
      setDefaultRoutes();

      function getStates() {
        return [{
          state: 'home',
          config: {
            url: '/',
            ncyBreadcrumb: {
              label: 'Home'
            }
          }
        }];
      }

      function setDefaultRoutes() {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
          // fix ui-router when
          // http://stackoverflow.com/questions/27120308/angular-ui-router-urlrouterprovider-when-not-working-when-i-click-a-ui-sref
          var defaultRoutes = {
            'home': {
              targetState: 'main'
            }
          };

          if (defaultRoutes[toState.name]) {
            event.preventDefault();
            var route = defaultRoutes[toState.name];
            $state.go(route.targetState, route.data);
          }

        });
      }
    });
})();

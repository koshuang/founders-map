(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('mockRouterHelper', mockRouterHelper);

  mockRouterHelper.$inject = [
    '$templateCache', '$location', '$state', '$rootScope', '$injector'
  ];

  function mockRouterHelper($templateCache, $location, $state, $rootScope,
    $injector) {
    return {
      mockTemplate: mockTemplate,
      goFrom: goFrom,
      goTo: goTo,
      resolve: resolve
    };

    function mockTemplate(templateRoute, tmpl) {
      $templateCache.put(templateRoute, tmpl || templateRoute);
    }

    function goFrom(url) {
      return {
        toState: function (state, params) {
          $location.replace().url(url); //Don't actually trigger a reload
          $state.go(state, params);
          $rootScope.$digest();
        }
      };
    }

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    function resolve(value) {
      return {
        forStateAndView: function (state, view) {
          var viewDefinition = view ? $state.get(state).views[view] : $state.get(state);
          return $injector.invoke(viewDefinition.resolve[value]);
        }
      };
    }
  }
})();

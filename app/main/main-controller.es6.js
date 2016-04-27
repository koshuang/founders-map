'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainController
 * @description
 * # MainController
 * Controller of the app
 */
angular.module('app.main')
  .controller('MainController', MainController);

function MainController($state, founderManager) {
  var vm = this;
  var indexes = {
    'main.list': 0,
    'main.map': 1
  };

  activate();

  function activate() {
    var state = $state.current.name;

    vm.selectedTab = indexes[state];

    if (founderManager.founders.length) {
      if (state === 'main') {
        $state.go('main.list');
      }
    }
  }
}

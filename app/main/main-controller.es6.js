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

function MainController($state) {
  var vm = this;
  var indexes = {
    'main.list': 0,
    'main.map': 1
  };

  vm.selectedTab = indexes[$state.current.name];
}

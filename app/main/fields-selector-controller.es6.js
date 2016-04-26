'use strict';

/**
 * @ngdoc function
 * @name app.controller:FieldsSelectorController
 * @description
 * # FieldsSelectorController
 * Controller of the app
 */
angular.module('app.main')
  .controller('FieldsSelectorController', FieldsSelectorController);

function FieldsSelectorController($state, founderManager) {
  var vm = this;

  vm.foundersArray = founderManager.foundersArray;
  vm.headers = founderManager.headers;
  vm.latitude = null;
  vm.longitude = null;
  vm.label = null;

  vm.submit = submit;

  function submit() {
    founderManager.setLocationHeader({
      latitude: vm.latitude,
      longitude: vm.longitude
    });

    founderManager.setLabelHeader(vm.label);

    founderManager.convertFoundersArray();

    $state.go('main.list');
  }
}

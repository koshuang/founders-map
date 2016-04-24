'use strict';

/**
 * @ngdoc function
 * @name app.controller:ImportController
 * @description
 * # ImportController
 * Controller of the app
 */
angular.module('app.main')
  .controller('ImportController', ImportController);

function ImportController($state, founderManager) {
  var vm = this;
  var locationHeader = {
    latitude: 'Garage Latitude',
    longitude: 'Garage Longitude'
  };

  vm.text = '';
  vm.founders = [];

  vm.submit = submit;

  function submit() {
    if (!vm.text) {
      return;
    }

    founderManager.parseCsv(vm.text);
    founderManager.setLocationHeader(locationHeader);
    founderManager.convertFoundersArray();

    $state.go('main.map');
  }
}

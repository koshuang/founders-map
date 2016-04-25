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

  vm.text = '';
  vm.separators = {
    comma: ',',
    semicolon: ';',
    tab: '\t'
  };
  vm.separator = vm.separators.comma;

  vm.submit = submit;

  function submit() {
    if (!vm.text) {
      return;
    }

    founderManager.parseCsv(vm.text, vm.separator);

    $state.go('main.fields-selector');
  }
}

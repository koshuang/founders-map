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
  vm.separators = [{
    label: 'comma',
    value: ','
  }, {
    label: 'semicolon',
    value: ';'
  }, {
    label: 'tab',
    value: '\t'
  }];
  vm.separator = vm.separators[0].value;

  vm.submit = submit;

  function submit() {
    if (!vm.text) {
      return;
    }

    founderManager.parseCsv(vm.text, vm.separator);

    // $state.go('main.setting');
    $state.transitionTo('main.setting', null, { reload: true, notify: true });
  }
}

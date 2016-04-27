'use strict';

/**
 * @ngdoc function
 * @name app.controller:SettingController
 * @description
 * # SettingController
 * Controller of the app
 */
angular.module('app.main')
  .controller('SettingController', SettingController);

function SettingController($state, founderManager) {
  var vm = this;

  vm.foundersArray = founderManager.foundersArray;
  vm.headers = founderManager.headers;
  vm.latitude = founderManager.latitude;
  vm.longitude = founderManager.longitude;
  vm.label = founderManager.label;

  vm.submit = submit;

  function submit() {
    founderManager.setLocationHeader({
      latitude: vm.latitude,
      longitude: vm.longitude
    });

    founderManager.setLabelHeader(vm.label);

    founderManager.convertFoundersArray();

    $state.transitionTo('main.list', null, { reload: true, notify: true });
  }
}

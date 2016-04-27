'use strict';

/**
 * @ngdoc function
 * @name app.controller:MapController
 * @description
 * # MapController
 * Controller of the app
 */
angular.module('app.main')
  .controller('MapController', MapController);

function MapController(founderManager, $state) {
  var vm = this;
  var founder;

  vm.headers = founderManager.headers;
  vm.latitude = founderManager.latitude;
  vm.longitude = founderManager.longitude;
  vm.label = founderManager.label;

  if (founderManager.founders) {
    vm.founders = founderManager.founders
      .filter((f) => {
        return f.enabled;
      })
      .map((f) => {
        return {
          id: f.id,
          coords: {
            latitude: f.latitude,
            longitude: f.longitude
          },
          options: {
            labelContent: f.label,
            labelClass: 'marker-labels',
            title: f.label
          }
        };
      });

    founder = vm.founders[0];

    vm.map = {
      center: {
        latitude: parseFloat(founder.coords.latitude),
        longitude: parseFloat(founder.coords.longitude)
      },
      zoom: 11
    };
  }

  vm.submit = submit;

  function submit() {
    founderManager.setLocationHeader({
      latitude: vm.latitude,
      longitude: vm.longitude
    });

    founderManager.setLabelHeader(vm.label);

    founderManager.convertFoundersArray();
    $state.reload();
  }
}

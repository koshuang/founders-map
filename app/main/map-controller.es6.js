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

function MapController(founderManager) {
  var vm = this;
  var founder;

  vm.founders = founderManager.founders.map((f) => {
    return {
      coords: {
        latitude: f.latitude,
        longitude: f.longitude
      },
      options: {
        label: f.name,
        title: f.name
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

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

function MapController(mockFounders) {
  var vm = this;
  var founder;

  vm.founders = mockFounders.map((f) => {
    return {
      id: f.id,
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

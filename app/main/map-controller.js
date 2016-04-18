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

function MapController() {
  var vm = this;

  vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
}

'use strict';

/**
 * @ngdoc function
 * @name app.controller:ListController
 * @description
 * # ListController
 * Controller of the app
 */
angular.module('app.main')
  .controller('ListController', ListController);

function ListController(founders, NgTableParams) {
  var vm = this;

  vm.founders = founders;

  vm.tableParams = new NgTableParams({
    page: 1, // show first page
    count: 10 // count per page
  }, {
    filterDelay: 0,
    data: vm.founders
  });
}

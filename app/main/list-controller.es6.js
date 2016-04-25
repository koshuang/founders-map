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

function ListController(founderManager, NgTableParams) {
  var vm = this;

  vm.founders = founderManager.founders;
  vm.headers = founderManager.headers.map((h) => {
    return {
      title: h,
      field: h,
      visible: true,
      sortable: h,
      filter: {
        [h]: 'text'
      }
    };
  });

  vm.tableParams = new NgTableParams({
    page: 1, // show first page
    count: 10 // count per page
  }, {
    filterDelay: 0,
    data: vm.founders
  });
}

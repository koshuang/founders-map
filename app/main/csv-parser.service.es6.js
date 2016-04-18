'use strict';

/**
 * @ngdoc service
 * @name app.main
 * @description
 * # csv parser
 * Factory in the app.
 */
angular.module('app.main')
  .factory('csvParser', function(CSV) {

    // Public API here
    return {
      parse: function(csv, separator = ',') {
        CSV.COLUMN_SEPARATOR = separator;
        return CSV.parse(csv);
      }
    };
  });

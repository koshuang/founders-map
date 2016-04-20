'use strict';

/**
 * @ngdoc service
 * @name app.core
 * @description
 * # csv parser
 * Factory in the app.
 */
angular.module('app.core')
  .factory('csvParser', function(CSV) {

    // Public API here
    return {
      parse: function(csv, separator = ',') {
        CSV.COLUMN_SEPARATOR = separator;
        return CSV.parse(csv);
      }
    };
  });

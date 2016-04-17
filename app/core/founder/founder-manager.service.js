'use strict';

/**
 * @ngdoc service
 * @name app.core
 * @description
 * # founder manager
 * Factory in the app.
 */
angular.module('app.core')
  .factory('founderManager', function(csvParser, R) {
    var fieldMapping = {
      'Id': 'id',
      'Company Name': 'companyName',
      'Founder': 'name',
      'City': 'city',
      'Country': 'country',
      'Postal Code': 'postalCode',
      'Street': 'street',
      'Photo': 'photo',
      'Home Page': 'homePage',
      'Garage Latitude': 'latitude',
      'Garage Longitude': 'longitude'
    };

    return {
      parseCsv: function(plainText) {
        var founders = [];
        var records = csvParser.parse(plainText);

        if (records.length > 1) {
          var headerArray = records.shift();
          var header = normalizeHeader(headerArray);

          founders = records.map((r) => R.zipObj(header, r));
        }

        return founders;
      }
    };

    function normalizeHeader(headerArray) {
      var normalizer = (originalField) => {
        return fieldMapping[originalField.trim()];
      };

      return R.map(normalizer)(headerArray);
    }
  });

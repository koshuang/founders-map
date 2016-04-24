'use strict';

/**
 * @ngdoc service
 * @name app.core
 * @description
 * # founder manager
 * Factory in the app.
 */
angular.module('app.core')
  .factory('founderManager', (csvParser, R, Founder) => {

    return {
      founders: [],
      headers: [],
      latitude: null,
      longitude: null,
      details: [],

      parseCsv: function(plainText) {
        var founders = [];
        var records = csvParser.parse(plainText);

        if (records.length > 1) {
          var headersArray = records.shift();
          this.headers = R.map(R.trim, headersArray);

          founders = records.map((r) => R.zipObj(this.headers, r));
          founders = R.map((obj) => {
            return new Founder(obj, {
              locationHeaders: {
                latitude: this.latitude,
                longitude: this.longitude
              },
              detailHeaders: this.details
            });
          }, founders);
        }

        this.founders = founders;
      },

      setLocationHeader: function({ latitude, longitude }) {
        this.latitude = latitude;
        this.longitude = longitude;
      },

      setDetailHeaders: function(detailHeaders) {
        this.details = detailHeaders;
      }
    };
  });

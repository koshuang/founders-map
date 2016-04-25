'use strict';

/**
 * @ngdoc service
 * @name app.core
 * @description
 * # founder manager
 * Factory in the app.
 */
angular.module('app.core')
  .factory('founderManager', (csvParser, R, Founder, $localStorage) => {

    class FounderManager {
      constructor() {
        this.label = null;
        this.latitude = null;
        this.longitude = null;
        this.details = [];
      }

      get founders() {
        if (this._founders) {
          return this._founders;
        } else if ($localStorage.founders) {
          this._founders = $localStorage.founders.map((f) => Founder.toFounder(f));
          return this._founders;
        }
        return [];
      }

      set founders(founders) {
        $localStorage.founders = founders;
        this._founders = founders;
      }

      get headers() {
        if (this._headers) {
          return this._headers;
        } else if ($localStorage.headers) {
          this._headers = $localStorage.headers;
          return this._headers;
        }
        return [];
      }

      set headers(headers) {
        $localStorage.headers = headers;
        this._headers = headers;
      }

      get foundersArray() {
        if (this._foundersArray) {
          return this._foundersArray;
        } else if ($localStorage.foundersArray) {
          this._foundersArray = $localStorage.foundersArray.map(
            (f) => Founder.toFounder(f)
          );
          return this._foundersArray;
        }
        return [];
      }

      set foundersArray(foundersArray) {
        $localStorage.foundersArray = foundersArray;
        this._foundersArray = foundersArray;
      }

      parseCsv(plainText, separator = ',') {
        var foundersArray = [];
        var records = csvParser.parse(plainText, separator);

        if (records.length > 1) {
          var headersArray = records.shift();
          this.headers = R.map(R.trim, headersArray);

          foundersArray = records.map((r) => R.zipObj(this.headers, r));
        }

        this.foundersArray = foundersArray;
      }

      convertFoundersArray() {
        var founders = R.map((obj) => {
          return new Founder(obj, {
            locationHeaders: {
              latitude: this.latitude,
              longitude: this.longitude
            },
            labelHeader: this.label,
            detailHeaders: this.details
          });
        }, this.foundersArray);

        this.founders = founders;
      }

      setLocationHeader({ latitude, longitude }) {
        this.latitude = latitude;
        this.longitude = longitude;
      }

      setLabelHeader(label) {
        this.label = label;
      }

      setDetailHeaders(detailHeaders) {
        this.details = detailHeaders;
      }
    }

    return new FounderManager();
  });

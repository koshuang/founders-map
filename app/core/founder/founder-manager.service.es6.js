'use strict';

/**
 * @ngdoc service
 * @name app.core
 * @description
 * # founder manager
 * Factory in the app.
 */
angular.module('app.core')
  .factory('founderManager', (csvParser, _, Founder, $localStorage) => {

    class FounderManager {
      constructor() {
        this.details = [];
      }

      get label() {
        if (this._label) {
          return this._label;
        } else if ($localStorage.label) {
          this._label = $localStorage.label;
          return this._label;
        }
        return '';
      }

      set label(label) {
        $localStorage.label = label;
        this._label = label;
      }

      get latitude() {
        if (this._latitude) {
          return this._latitude;
        } else if ($localStorage.latitude) {
          this._latitude = $localStorage.latitude;
          return this._latitude;
        }
        return '';
      }

      set latitude(latitude) {
        $localStorage.latitude = latitude;
        this._latitude = latitude;
      }

      get longitude() {
        if (this._longitude) {
          return this._longitude;
        } else if ($localStorage.longitude) {
          this._longitude = $localStorage.longitude;
          return this._longitude;
        }
        return '';
      }

      set longitude(longitude) {
        $localStorage.longitude = longitude;
        this._longitude = longitude;
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
          this.headers = _.map(headersArray, _.flow(
            _.trim,
            (h) => {
              // remove space
              return _.replace(h, ' ', '');
            }
          ));

          foundersArray = records.map((r) => _.zipObject(this.headers, r));
        }

        this.foundersArray = foundersArray;
      }

      convertFoundersArray() {
        var founders = _.map(this.foundersArray, (obj) => {
          return new Founder(obj, {
            locationHeaders: {
              latitude: this.latitude,
              longitude: this.longitude
            },
            labelHeader: this.label,
            detailHeaders: this.details
          });
        });

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

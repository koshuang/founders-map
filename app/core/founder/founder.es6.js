/* jshint -W069 */
'use strict';

/**
 * @ngdoc service
 * @name app.model/founder
 * @description
 * # model/founder
 * Factory in the app.
 */
angular.module('app.core')
  .factory('Founder', function(_) {
    class Founder {
      constructor(data, meta) {
        _.assign(this, data);
        this._data = data;
        this._latitude = meta.locationHeaders.latitude;
        this._longitude = meta.locationHeaders.longitude;
        this._label = meta.labelHeader;
        this._detailHeaders = meta.detailHeaders;
        this.enabled = true;
      }

       static toFounder(obj) {
        return new Founder(
          obj._data,
          {
            locationHeaders: {
              latitude: obj._latitude,
              longitude: obj._longitude
            },
            labelHeader: obj._label,
            detailHeaders: obj._detailHeaders
          }
        );
      }

      get id() {
        return this._data['Id'];
      }

      get label() {
        return this._data[this._label];
      }

      get latitude() {
        return parseFloat(this._data[this._latitude]);
      }

      get longitude() {
        return parseFloat(this._data[this._longitude]);
      }

      get founder() {
        return this._data['Founder'];
      }
    }

    return Founder;
  });

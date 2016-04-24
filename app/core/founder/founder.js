'use strict';

/**
 * @ngdoc service
 * @name app.model/founder
 * @description
 * # model/founder
 * Factory in the app.
 */
angular.module('app.core')
  .factory('Founder', function() {
    function Founder(data, meta) {
      this._data = data;
      this._latitude = meta.locationHeaders.latitude;
      this._longitude = meta.locationHeaders.longitude;
      this._detailHeaders = meta.detailHeaders;
    }

    Founder.prototype = {
      get latitude() {
        return parseFloat(this._data[this._latitude]);
      },

      get longitude() {
        return parseFloat(this._data[this._longitude]);
      }
    };

    return Founder;
  });

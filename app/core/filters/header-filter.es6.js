'use strict';

/**
 * @ngdoc service
 * @name app.config/apiUrl
 * @description
 * # config/apiUrl
 * Constant in the app.
 */
angular.module('app.core')
  .filter('fmHeader', function(_) {
    return (input) => {
      return _.startCase(input);
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name app.config/apiUrl
 * @description
 * # config/apiUrl
 * Constant in the app.
 */
angular.module('app.core')
  .filter('fmLink', function() {
    return (input) => {
      if (input.startsWith && input.startsWith('http')) {
        if (input.endsWith && input.endsWith('jpg')) {
          return `<image class="fm-thumbnail" src="${input}">`;
        } else {
          return `<a href="${input}">${input}</a>`;
        }
      }

      return input;
    };
  });

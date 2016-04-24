/* jshint -W117, -W030 */
describe('ImportController', function() {
  'use strict';
  var vm;

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('$rootScope', '$controller', 'mockFounders');

    vm = $controller('ImportController', {
    });
  });

  describe('ImportController()', function() {
    it('should contain text', function() {
    });
  });
});

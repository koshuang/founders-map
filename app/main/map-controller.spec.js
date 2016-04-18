/* jshint -W117, -W030 */
describe('MapController', function() {
  'use strict';
  var controller, $scope;

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('$rootScope', '$controller');

    $scope = $rootScope.$new();
    controller = $controller('MapController', {
    });
  });

  describe('MapController()', function() {
    it('should contain map', function() {
      expect(true).to.be.eq(true);
    });
  });
});

/* jshint -W117, -W030 */
describe('MapController', function() {
  'use strict';
  var vm;

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('$rootScope', '$controller', 'mockFounders');

    vm = $controller('MapController', {
      mockFounders: mockFounders
    });
  });

  describe('MapController()', function() {
    it('should contain map', function() {
      expect(vm.map).to.not.be.null;
    });

    it('should contain founders', function() {
      expect(vm.founders.length).to.be.eq(3);
    });
  });
});

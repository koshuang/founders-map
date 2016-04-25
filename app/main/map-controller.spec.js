/* jshint -W117, -W030 */
describe('MapController', function() {
  'use strict';
  var vm;

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('$rootScope', '$controller', 'founderManager', 'mockFounders');

    mockFounders = mockFounders.map((f) => {
      f.enabled = true;
      return f;
    });

    founderManager.founders = mockFounders;

    vm = $controller('MapController', {
      founderManager: founderManager
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

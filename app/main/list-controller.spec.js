/* jshint -W117, -W030 */
describe('ListController', function() {
  'use strict';
  var vm;

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('$rootScope', '$controller', 'mockFounders');

    mockFounders = mockFounders.map((f) => {
      f.enabled = true;
      return f;
    });

    vm = $controller('ListController', {
      founders: mockFounders
    });
  });

  describe('ListController()', function() {
    it('should contain founders', function() {
      expect(vm.founders.length).to.be.eq(3);
    });
  });
});

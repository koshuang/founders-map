/* jshint -W117, -W030 */
describe('MainController', function() {
  'use strict';
  var vm, $state;

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('$controller');

    $state = {
      current: {}
    };
  });

  describe('MainController()', function() {
    it('should get correct selectedTab for state main.list', function() {
      $state.current.name = 'main.list';

      vm = $controller('MainController', {
        $state: $state
      });

      expect(vm.selectedTab).to.be.eq(0);
    });

    it('should get correct selectedTab for state main.map', function() {
      $state.current.name = 'main.map';

      vm = $controller('MainController', {
        $state: $state
      });

      expect(vm.selectedTab).to.be.eq(1);
    });
  });
});

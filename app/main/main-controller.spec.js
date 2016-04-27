/* jshint -W117, -W030 */
describe('MainController', function() {
  'use strict';
  var vm, $state;

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('$controller', 'founderManager');

    $state = {
      current: {},
      go: sinon.spy()
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

    it('should redirect to main.list page if founderManager.founders is not empty', function() {
      founderManager.founders = ['Test'];
      $state.current.name = 'main';

      vm = $controller('MainController', {
        $state: $state
      });

      expect($state.go.calledWith('main.list')).to.be.ok;
    });
  });
});

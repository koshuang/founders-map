/* jshint -W117, -W030 */
describe('ImportController', function() {
  'use strict';
  var $state, vm, founderManager, parsed;

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('$rootScope', '$controller', 'mockFounders');

    parsed = false;
    founderManager = {
      parseCsv: sinon.spy()
    };

    $state = {
      transitionTo: sinon.spy()
    };

    vm = $controller('ImportController', {
      $state: $state,
      founderManager: founderManager
    });
  });

  describe('ImportController()', function() {
    it('should contain text and submit()', function() {
      expect(vm.text).to.be.eq('');
      expect(vm.separators).to.not.be.null;
      expect(vm.separator).to.be.eq(vm.separators[0].value);
      expect(vm.submit).to.not.be.null;
    });
  });

  describe('submit()', function() {
    it('should call founderManager.parseCsv()', function() {

      vm.text = 'text';
      vm.submit();

      expect(founderManager.parseCsv.calledWith('text')).to.be.ok;
      expect($state.transitionTo.calledWith('main.setting')).to.be.ok;
    });
  });
});

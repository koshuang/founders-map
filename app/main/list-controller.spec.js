/* jshint -W117, -W030 */
describe('ListController', function() {
  'use strict';
  var vm, header;

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('$rootScope', '$controller', 'founderManager', 'fmHeaderFilter');

    header = 'PostalCode';

    founderManager.headers = [header];
    founderManager.founders = ['Test'];

    vm = $controller('ListController', {
      founderManager: founderManager,
      fmHeaderFilter: fmHeaderFilter
    });
  });

  describe('ListController()', function() {
    it('should contain founders', function() {
      expect(vm.founders.length).to.be.eq(1);
    });

    it('should contain headers', function() {
      var target = {
        title: fmHeaderFilter(header),
        field: header,
        visible: true,
        sortable: header
      };

      expect(vm.headers[1]).to.deep.eq(target);
    });
  });
});

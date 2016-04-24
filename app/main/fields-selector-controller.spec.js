/* jshint -W117, -W030 */
describe('FieldsSelectorController', function() {
  'use strict';
  var vm;

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('$rootScope', '$controller', 'founderManager');

    jasmine.getFixtures().fixturesPath =
      'base/app/core/founder/fixtures';
    var csv = jasmine.getFixtures().read('founders.csv');
    var $state = {
      go: () => {}
    };

    founderManager.parseCsv(csv);

    vm = $controller('FieldsSelectorController', {
      $state: $state,
      founderManager: founderManager
    });
  });

  describe('FieldsSelectorController()', function() {
    it('should contain foundersArray', function() {
      expect(vm.foundersArray.length).to.be.eq(3);
    });

    it('should contain headers', function() {
      expect(vm.headers.length).to.be.eq(11);
    });
  });

  describe('Submit()', function() {
    it('should set latitude and longitude for founderManager correctly', function() {
      vm.latitude = 'Garage Latitude';
      vm.longitude = 'Garage Longitude';

      vm.submit();

      expect(founderManager.latitude).to.be.eq(vm.latitude);
      expect(founderManager.longitude).to.be.eq(vm.longitude);
    });
  });
});

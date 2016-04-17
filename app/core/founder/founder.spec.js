/* jshint -W117, -W030 */
describe('Founder', function() {
  'use strict';

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('Founder');
  });

  describe('Founder()', function() {
    it('should create a founder instance', function() {
      var founder = new Founder();

      expect(founder).to.be.instanceof(Founder);
    });
  });
});

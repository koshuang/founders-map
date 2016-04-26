// jscs:disable maximumLineLength
/* jshint -W117, -W030 */
describe('fmHeaderFilter', function() {
  'use strict';

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('fmHeaderFilter');
  });

  it('should add space to camel format string', function() {
    var str = fmHeaderFilter('PostalCode');

    expect(str).to.be.eq('Postal Code');
  });
});

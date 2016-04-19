// jscs:disable maximumLineLength
/* jshint -W117, -W030 */
describe('founderManager', function() {
  'use strict';

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('founderManager');

    jasmine.getFixtures().fixturesPath =
      'base/app/core/founder/fixtures';
  });

  describe('parseCsv()', function() {
    it('should convert csv to founders', function() {
      var csv = jasmine.getFixtures().read('founders.csv');

      var founders = founderManager.parseCsv(csv);
      var founder = founders[0];

      expect(founder.id).to.be.eq(1);
      expect(founder.companyName).to.be.eq('Google');
      expect(founder.name).to.be.eq('Larry Page & Sergey Brin');
      expect(founder.city).to.be.eq('Mountain View');
      expect(founder.country).to.be.eq('USA');
      expect(founder.postalCode).to.be.eq('CA 94043');
      expect(founder.street).to.be.eq('1600 Amphitheatre Pkwy');
      expect(founder.photo).to.be.eq('http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg');
      expect(founder.homePage).to.be.eq('http://google.com');
      expect(founder.latitude).to.be.eq(37.457674);
      // TODO: need to convert to number
      expect(founder.longitude).to.be.eq('-122.163452');
    });
  });
});

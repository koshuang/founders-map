/* jshint -W117, -W030 */
describe('Founder', function() {
  'use strict';

  var founder, founderObj;

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('Founder');

    jasmine.getJSONFixtures().fixturesPath =
      'base/app/core/founder/fixtures';

    founderObj = getJSONFixture('founder.json');

    founder = new Founder(founderObj, {
      locationHeaders: {
        latitude: 'GarageLatitude',
        longitude: 'GarageLongitude'
      },
      labelHeader: 'Founder',
      detailHeaders: ['City']
    });
  });

  describe('Founder()', function() {
    it('should create a founder instance', function() {
      expect(founder).to.be.instanceof(Founder);
    });

    it('should contain same data as founderObj', function() {
      expect(founder.Id).to.be.eq(founderObj.Id);
    });
  });

  describe('label', function() {
    it('should get label', function() {
      expect(founder.label).to.be.eq('Larry Page & Sergey Brin');
    });
  });

  describe('latitude', function() {
    it('should get latitude', function() {
      expect(founder.latitude).to.be.eq(37.457674);
    });
  });

  describe('longitude', function() {
    it('should get longitude', function() {
      expect(founder.longitude).to.be.eq(-122.163452);
    });
  });
});

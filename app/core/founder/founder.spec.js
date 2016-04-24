/* jshint -W117, -W030 */
describe('Founder', function() {
  'use strict';

  var founder;

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('Founder');

    jasmine.getJSONFixtures().fixturesPath =
      'base/app/core/founder/fixtures';

    var founderObj = getJSONFixture('founder.json');

    founder = new Founder(founderObj, {
      locationHeaders: {
        latitude: 'Garage Latitude',
        longitude: 'Garage Longitude'
      },
      detailHeaders: ['City']
    });
  });

  describe('Founder()', function() {
    it('should create a founder instance', function() {
      expect(founder).to.be.instanceof(Founder);
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

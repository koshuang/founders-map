// jscs:disable maximumLineLength
/* jshint -W117, -W030 */
describe('founderManager', function() {
  'use strict';

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('founderManager');

    jasmine.getFixtures().fixturesPath =
    jasmine.getJSONFixtures().fixturesPath =
      'base/app/core/founder/fixtures';
  });

  describe('parseCsv()', function() {
    it('should convert csv and save founders', function() {
      var csv = jasmine.getFixtures().read('founders.csv');
      var matchedFounder = getJSONFixture('founder.json');

      founderManager.parseCsv(csv);

      var founders = founderManager.foundersArray;
      var founder = founders[0];


      var headers = Object.keys(matchedFounder);

      expect(founderManager.headers).to.deep.eq(headers);

      headers.forEach((header) => {
        expect(founder[header]).to.be.eq(matchedFounder[header]);
      });
    });
  });

  describe('setLocationHeader()', function() {
    it('should set latitude and longitude', function() {
      var locationHeader = {
        latitude: 'Garage Latitude',
        longitude: 'Garage Longitude'
      };

      founderManager.setLocationHeader(locationHeader);
      expect(founderManager.latitude).to.deep.eq('Garage Latitude');
      expect(founderManager.longitude).to.deep.eq('Garage Longitude');
    });
  });

  describe('setDetailHeaders()', function() {
    it('should set detail headers', function() {
      var details = ['City', 'Street', 'Postal Code'];

      founderManager.setDetailHeaders(details);
      expect(founderManager.details.length).to.be.eq(3);
    });
  });

  describe('convertFoundersArray()', function() {
    it('should convert foundersArray', function() {
      var csv = jasmine.getFixtures().read('founders.csv');
      var locationHeader = {
        latitude: 'Garage Latitude',
        longitude: 'Garage Longitude'
      };

      founderManager.parseCsv(csv);
      founderManager.setLocationHeader(locationHeader);
      founderManager.convertFoundersArray();

      var founders = founderManager.founders;
      var founder = founders[0];

      expect(founder.latitude).to.be.eq(37.457674);
      expect(founder.longitude).to.be.eq(-122.163452);
    });
  });
});

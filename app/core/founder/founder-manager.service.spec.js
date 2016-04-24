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
    it('should convert csv and save founders', function() {
      var csv = jasmine.getFixtures().read('founders.csv');

      founderManager.parseCsv(csv);

      var founders = founderManager.founders;
      var founder = founders[0];

      var matchedFounder = {
        'Id': 1,
        'Company Name': 'Google',
        'Founder': 'Larry Page & Sergey Brin',
        'City': 'Mountain View',
        'Country': 'USA',
        'Postal Code': 'CA 94043',
        'Street': '1600 Amphitheatre Pkwy',
        'Photo': 'http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg',
        'Home Page': 'http://google.com',
        'Garage Latitude': 37.457674,
        'Garage Longitude': '-122.163452'
      };

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
});

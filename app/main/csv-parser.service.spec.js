/* jshint -W117, -W030 */
describe('csvParser', function() {
  'use strict';

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('csvParser');
  });

  describe('parse()', function() {
    it('should parse header correctly with comma separated', function() {
      var csv = `Id,Company Name,Founder`;
      var rows = csvParser.parse(csv);
      var row = rows[0];

      expect(row[0]).to.be.eq('Id');
    });

    it('should parse header correctly with tab separated', function() {
      var csv = `Id\tCompany\tName\tFounder`;
      var rows = csvParser.parse(csv, '\t');
      var row = rows[0];

      expect(row[0]).to.be.eq('Id');
    });

    it('should parse header correctly with semicolon separated', function() {
      var csv = `Id;Company;Name;Founder`;
      var rows = csvParser.parse(csv, ';');
      var row = rows[0];

      expect(row[0]).to.be.eq('Id');
    });
  });
});

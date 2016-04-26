// jscs:disable maximumLineLength
/* jshint -W117, -W030 */
describe('fmLinkFilter', function() {
  'use strict';

  String.prototype.startsWith = String.prototype.startsWith || function(prefix) {
    return this.indexOf(prefix) === 0;
  };

  String.prototype.endsWith = String.prototype.endsWith || function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) >= 0;
  };

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('fmLinkFilter');
  });

  it('should not convert if it is a normal string', function() {
    var str = 'goo.gl';
    var convertedStr = fmLinkFilter(str);

    expect(convertedStr).to.be.eq('goo.gl');
  });

  it('should convert to image if string contain extension', function() {
    var str = 'http://goo.gl/a.jpg';
    var convertedStr = fmLinkFilter(str);

    expect(convertedStr).to.be.eq('<image class="fm-thumbnail" src="http://goo.gl/a.jpg">');
  });

  it('should convert to link if string contain extension', function() {
    var str = 'http://goo.gl';
    var convertedStr = fmLinkFilter(str);

    expect(convertedStr).to.be.eq('<a href="http://goo.gl">http://goo.gl</a>');
  });
});

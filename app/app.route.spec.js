/* jshint -W117, -W030 */
describe('app.route', function() {
  'use strict';

  var helper;

  beforeEach(module('app.core'));

  beforeEach(function () {

    bard.inject('mockRouterHelper', '$state', '$location', '$cookieStore', '$timeout');
    helper = mockRouterHelper;

    this.sinon = sinon.sandbox.create();

    this.sinon.stub($state, 'go');
    this.sinon.stub($cookieStore, 'put');

  });

  describe('path', function() {
    beforeEach(function() {
      helper.mockTemplate('layout/main-layout.html');
    });

    var pathDetails = [{
      path: '/',
      state: '',
      template: 'main/main.html'
    }];

    pathDetails.forEach(({ path, state, template }) => {
      // console.log('detail', detail);

      describe(path, function () {
        beforeEach(function () {
          helper.mockTemplate(template);
        });

        it('should go to the ' + state + ' state', function () {
          helper.goTo(path);
          expect($state.current.name).to.be.eq(state);
        });
      });
    });
  });
});

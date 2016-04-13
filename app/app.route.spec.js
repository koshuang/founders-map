/* jshint -W117, -W030 */
describe('app.route', function() {
  'use strict';

  var helper;

  beforeEach(function () {
    beforeEach(module('app.core'));

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

  describe('state', function() {
    describe('params', function () {
      it('should resolve params', function () {
        mockRouterHelper.resolve('params')
          .forStateAndView('auth.facebookLogin');

        expect($location.search).to.be.called;
        expect($cookieStore.put).to.be.called;
        expect(authService.autoLogin).to.be.called;
        $timeout.flush();
        expect($state.go).to.be.called;
      });
    });
  });
});

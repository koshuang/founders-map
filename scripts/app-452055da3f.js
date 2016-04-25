function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function MapController(e){var t,n=this;n.founders=e.founders.map(function(e){return{id:e.id,coords:{latitude:e.latitude,longitude:e.longitude},options:{label:e.founder,title:e.founder}}}),t=n.founders[0],n.map={center:{latitude:parseFloat(t.coords.latitude),longitude:parseFloat(t.coords.longitude)},zoom:11}}function ListController(e,t){var n=this;n.founders=e,n.tableParams=new t({page:1,count:10},{filterDelay:0,data:n.founders})}function ImportController(e,t){function n(){o.text&&(t.parseCsv(o.text,o.separator),e.go("main.fields-selector"))}var o=this;o.text="",o.separators={comma:",",semicolon:";",tab:"	"},o.separator=o.separators.comma,o.submit=n}function FieldsSelectorController(e,t){function n(){t.setLocationHeader({latitude:o.latitude,longitude:o.longitude}),t.convertFoundersArray(),e.go("main.map")}var o=this;o.foundersArray=t.foundersArray,o.headers=t.headers,o.latitude=null,o.longitude=null,o.submit=n}!function(){"use strict";angular.module("app.core",["ngAnimate","ngRoute","ngCookies","ngSanitize","ngResource","ngStorage","ngTable","app.blocks","ui.router","ui.bootstrap"])}();var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();angular.module("app.core").factory("founderManager",["csvParser","R","Founder","$localStorage",function(e,t,n,o){var r=function(){function r(){_classCallCheck(this,r),this.latitude=null,this.longitude=null,this.details=[]}return _createClass(r,[{key:"parseCsv",value:function(n){var o=this,r=arguments.length<=1||void 0===arguments[1]?",":arguments[1],a=[],i=e.parse(n,r);if(i.length>1){var l=i.shift();this.headers=t.map(t.trim,l),a=i.map(function(e){return t.zipObj(o.headers,e)})}this.foundersArray=a}},{key:"convertFoundersArray",value:function(){var e=this,o=t.map(function(t){return new n(t,{locationHeaders:{latitude:e.latitude,longitude:e.longitude},detailHeaders:e.details})},this.foundersArray);this.founders=o}},{key:"setLocationHeader",value:function(e){var t=e.latitude,n=e.longitude;this.latitude=t,this.longitude=n}},{key:"setDetailHeaders",value:function(e){this.details=e}},{key:"founders",get:function(){return this._founders?this._founders:o.founders?(this._founders=o.founders.map(function(e){return n.toFounder(e)}),this._founders):[]},set:function(e){o.founders=e,this._founders=e}},{key:"headers",get:function(){return this._headers?this._headers:o.headers?(this._headers=o.headers,this._headers):[]},set:function(e){o.headers=e,this._headers=e}},{key:"foundersArray",get:function(){return this._foundersArray?this._foundersArray:o.foundersArray?(this._foundersArray=o.foundersArray.map(function(e){return n.toFounder(e)}),this._foundersArray):[]},set:function(e){o.foundersArray=e,this._foundersArray=e}}]),r}();return new r}]),angular.module("app.core").factory("csvParser",["CSV",function(e){return{parse:function(t){var n=arguments.length<=1||void 0===arguments[1]?",":arguments[1];return e.COLUMN_SEPARATOR=n,e.parse(t)}}}]),function(){"use strict";function e(e){e.configure({v:"3.20",libraries:"weather,geometry,visualization"})}angular.module("app.main",["app.core","uiGmapgoogle-maps"]).config(e),e.$inject=["uiGmapGoogleMapApiProvider"]}(),angular.module("app.main").controller("MapController",MapController),MapController.$inject=["founderManager"],angular.module("app.main").controller("ListController",ListController),ListController.$inject=["founders","NgTableParams"],angular.module("app.main").controller("ImportController",ImportController),ImportController.$inject=["$state","founderManager"],angular.module("app.main").controller("FieldsSelectorController",FieldsSelectorController),FieldsSelectorController.$inject=["$state","founderManager"],function(){"use strict";function e(e,t,n,o,r){function a(t,n){e.put(t,n||t)}function i(e){return{toState:function(r,a){t.replace().url(e),n.go(r,a),o.$digest()}}}function l(e){t.url(e),o.$digest()}function s(e){return{forStateAndView:function(t,o){var a=o?n.get(t).views[o]:n.get(t);return r.invoke(a.resolve[e])}}}return{mockTemplate:a,goFrom:i,goTo:l,resolve:s}}angular.module("app.core").factory("mockRouterHelper",e),e.$inject=["$templateCache","$location","$state","$rootScope","$injector"]}(),angular.module("app.core").factory("applicationTask",function(){return{init:function(){}}}),angular.module("app.core").constant("apiUrl",{}),function(){"use strict";angular.module("blocks.router",["ui.router","blocks.logger"])}(),function(){"use strict";function e(e,t,n){function o(e,o,a,i){function l(e,o){e.forEach(function(e){e.config.resolve=angular.extend(e.config.resolve||{},r.resolveAlways),t.state(e.state,e.config)}),o&&!g&&(g=!0,n.otherwise(o))}function s(){o.$on("$stateChangeError",function(t,n,o,r,a,l){if(!p){m.errors++,p=!0;var s=n&&(n.title||n.name||n.loadedTemplateUrl)||"unknown target",u="Error routing to "+s+". "+(l.data||"")+". <br/>"+(l.statusText||"")+": "+(l.status||"");i.warning(u,[n]),e.path("/")}})}function u(){s(),d()}function c(){return a.get()}function d(){o.$on("$stateChangeSuccess",function(e,t){m.changes++,p=!1;var n=r.docTitle+" "+(t.title||"");o.title=n})}var p=!1,g=!1,m={errors:0,changes:0},f={configureStates:l,getStates:c,stateCounts:m};return u(),f}var r={docTitle:void 0,resolveAlways:{}};e.html5Mode(!1),this.configure=function(e){angular.extend(r,e)},this.$get=o,o.$inject=["$location","$rootScope","$state","logger"]}angular.module("blocks.router").provider("routerHelper",e),e.$inject=["$locationProvider","$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("blocks.logger",[])}(),function(){"use strict";function e(e){function t(t,n){e.error("Error: "+t,n)}function n(t,n){e.info("Info: "+t,n)}function o(t,n){e.info("Success: "+t,n)}function r(t,n){e.warn("Warning: "+t,n)}var a={showToasts:!0,error:t,info:n,success:o,warning:r,log:e.log};return a}angular.module("blocks.logger").factory("logger",e),e.$inject=["$log"]}(),function(){"use strict";angular.module("blocks.exception",["blocks.logger"])}(),function(){"use strict";function e(e){function t(t){return function(n){e.error(t,n)}}var n={catcher:t};return n}angular.module("blocks.exception").factory("exception",e),e.$inject=["logger"]}(),function(){"use strict";function e(){this.config={appErrorPrefix:void 0},this.configure=function(e){this.config.appErrorPrefix=e},this.$get=function(){return{config:this.config}}}function t(e){e.decorator("$exceptionHandler",n)}function n(e,t,n){return function(o,r){var a=t.config.appErrorPrefix||"",i={exception:o,cause:r};o.message=a+o.message,e(o,r),n.error(o.message,i)}}angular.module("blocks.exception").provider("exceptionHandler",e).config(t),t.$inject=["$provide"],n.$inject=["$delegate","exceptionHandler","logger"]}(),function(){"use strict";angular.module("app.core").constant("mockFounders",[{id:1,companyName:"Google",name:"Larry Page & Sergey Brin",city:"Mountain View",country:"USA",postalCode:"CA 94043",street:"1600 Amphitheatre Pkwy",photo:"http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg",homePage:"http://google.com",latitude:37.457674,longitude:"-122.163452"},{id:2,companyName:"Apple",name:"Steve Jobs & Steve Wozniak",city:"Cupertino",country:"USA",postalCode:"CA 95014",street:"1 Infinite Loop",photo:"http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg",homePage:"http://apple.com",latitude:37.3403188,longitude:"-122.0581469"},{id:3,companyName:"Microsoft",name:"Bill Gates",city:"Redmond",country:"USA",postalCode:"WA 98052-7329",street:"One Microsoft Way",photo:"http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg",homePage:"http://microsoft.com",latitude:37.472189,longitude:"-122.190191"}])}(),angular.module("app.core").factory("Founder",function(){function e(e,t){this._data=e,this._latitude=t.locationHeaders.latitude,this._longitude=t.locationHeaders.longitude,this._detailHeaders=t.detailHeaders}return e.prototype={get id(){return this._data.Id},get latitude(){return parseFloat(this._data[this._latitude])},get longitude(){return parseFloat(this._data[this._longitude])},get founder(){return this._data.Founder}},e.toFounder=function(t){return new e(t._data,{locationHeaders:{latitude:t._latitude,longitude:t._longitude},detailHeaders:t._detailHeaders})},e}),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"main",config:{url:"/",ncyBreadcrumb:{label:"Home"},views:{"":{templateUrl:"layout/main-layout.html"},"context@main":{templateUrl:"main/main.html"}},resolve:{redirectResolver:n}}},{state:"main.import",config:{url:"import",ncyBreadcrumb:{label:"Import"},views:{"main-context":{controller:"ImportController",templateUrl:"main/import.html",controllerAs:"vm"}},resolve:{redirectResolver:n}}},{state:"main.fields-selector",config:{url:"fields-selector",ncyBreadcrumb:{label:"Field Selector"},views:{"main-context":{controller:"FieldsSelectorController",templateUrl:"main/fields-selector.html",controllerAs:"vm"}},resolve:{redirectResolver:n,founders:["$state","$q","$timeout","founderManager",function(e,t,n,o){return o.founders}]}}},{state:"main.list",config:{url:"list",ncyBreadcrumb:{label:"List"},views:{"main-context":{controller:"ListController",templateUrl:"main/list.html",controllerAs:"vm"}},resolve:{redirectResolver:n,founders:["$state","$q","$timeout","founderManager",function(e,t,n,o){return o.founders}]}}},{state:"main.map",config:{url:"map",ncyBreadcrumb:{label:"Map"},views:{"main-context":{controller:"MapController",templateUrl:"main/map.html",controllerAs:"vm"}},resolve:{redirectResolver:n}}}]}function n(e,t,n,o){o.foundersArray.length||"main.import"!==e.name&&n(function(){e.go("main.import")})}angular.module("app.main").run(e),e.$inject=["routerHelper"],n.$inject=["$state","$q","$timeout","founderManager"]}(),function(){"use strict";angular.module("app.layout",["app.core"])}(),angular.module("app.blocks",["blocks.exception","blocks.logger","blocks.router"]),function(){"use strict";function e(e){var n="/";e.configureStates(t(),n)}function t(){return[]}angular.module("app.core").run(e),e.$inject=["routerHelper"]}(),function(){"use strict";angular.module("app.core").constant("R",R).constant("CSV",CSV)}(),function(){"use strict";function e(e,t,o){e.debugEnabled&&e.debugEnabled(!0),o.configure(n.appErrorPrefix),t.configure({docTitle:n.appTitle+": "})}var t=angular.module("app.core"),n={appErrorPrefix:"[app Error] ",appTitle:"ImHere"};t.config(e),e.$inject=["$logProvider","routerHelperProvider","exceptionHandlerProvider"]}(),function(){"use strict";angular.module("app",["app.core","app.main"]).run(["applicationTask",function(e){e.init()}])}(),function(){"use strict";angular.module("app").run(["$rootScope","$state","routerHelper",function(e,t,n){function o(){return[{state:"home",config:{url:"/",ncyBreadcrumb:{label:"Home"}}}]}function r(){e.$on("$stateChangeStart",function(e,n){var o={home:{targetState:"main"}};if(o[n.name]){e.preventDefault();var r=o[n.name];t.go(r.targetState,r.data)}})}n.configureStates(o()),r()}])}(),angular.module("app").run(["$templateCache",function(e){e.put("404.html",'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Page Not Found :(</title><style>\n      ::-moz-selection {\n        background: #b3d4fc;\n        text-shadow: none;\n      }\n\n      ::selection {\n        background: #b3d4fc;\n        text-shadow: none;\n      }\n\n      html {\n        padding: 30px 10px;\n        font-size: 20px;\n        line-height: 1.4;\n        color: #737373;\n        background: #f0f0f0;\n        -webkit-text-size-adjust: 100%;\n        -ms-text-size-adjust: 100%;\n      }\n\n      html,\n      input {\n        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n      }\n\n      body {\n        max-width: 500px;\n        _width: 500px;\n        padding: 30px 20px 50px;\n        border: 1px solid #b3b3b3;\n        border-radius: 4px;\n        margin: 0 auto;\n        box-shadow: 0 1px 10px #a7a7a7, inset 0 1px 0 #fff;\n        background: #fcfcfc;\n      }\n\n      h1 {\n        margin: 0 10px;\n        font-size: 50px;\n        text-align: center;\n      }\n\n      h1 span {\n        color: #bbb;\n      }\n\n      h3 {\n        margin: 1.5em 0 0.5em;\n      }\n\n      p {\n        margin: 1em 0;\n      }\n\n      ul {\n        padding: 0 0 0 40px;\n        margin: 1em 0;\n      }\n\n      .container {\n        max-width: 380px;\n        _width: 380px;\n        margin: 0 auto;\n      }\n\n      /* google search */\n\n      #goog-fixurl ul {\n        list-style: none;\n        padding: 0;\n        margin: 0;\n      }\n\n      #goog-fixurl form {\n        margin: 0;\n      }\n\n      #goog-wm-qt,\n      #goog-wm-sb {\n        border: 1px solid #bbb;\n        font-size: 16px;\n        line-height: normal;\n        vertical-align: top;\n        color: #444;\n        border-radius: 2px;\n      }\n\n      #goog-wm-qt {\n        width: 220px;\n        height: 20px;\n        padding: 5px;\n        margin: 5px 10px 0 0;\n        box-shadow: inset 0 1px 1px #ccc;\n      }\n\n      #goog-wm-sb {\n        display: inline-block;\n        height: 32px;\n        padding: 0 10px;\n        margin: 5px 0 0;\n        white-space: nowrap;\n        cursor: pointer;\n        background-color: #f5f5f5;\n        background-image: -webkit-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n        background-image: -moz-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n        background-image: -ms-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n        background-image: -o-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        appearance: none;\n        *overflow: visible;\n        *display: inline;\n        *zoom: 1;\n      }\n\n      #goog-wm-sb:hover,\n      #goog-wm-sb:focus {\n        border-color: #aaa;\n        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n        background-color: #f8f8f8;\n      }\n\n      #goog-wm-qt:hover,\n      #goog-wm-qt:focus {\n        border-color: #105cb6;\n        outline: 0;\n        color: #222;\n      }\n\n      input::-moz-focus-inner {\n        padding: 0;\n        border: 0;\n      }\n    </style></head><body><div class="container"><h1>Not found <span>:(</span></h1><p>Sorry, but the page you were trying to view does not exist.</p><p>It looks like this was the result of either:</p><ul><li>a mistyped address</li><li>an out-of-date link</li></ul><script>\n        var GOOG_FIXURL_LANG = (navigator.language || \'\').slice(0,2),GOOG_FIXURL_SITE = location.host;\n      </script><script src="//linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js"></script></div></body></html>'),e.put("index.html",'<!doctype html><html class="no-js"><head><meta charset="utf-8"><meta name="description" content=""><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>Founder\'s Map</title><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"><link rel="stylesheet" href="styles/main.css"></head><body ng-app="app"><div ui-view=""></div><script async="" defer="" src="https://maps.googleapis.com/maps/api/js?sensor=false">\n    </script><script>\n      (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n      })(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');\n\n      ga(\'create\', \'UA-31366910-5\', \'auto\');\n\n    </script></body></html>'),e.put("layout/main-layout.html",'<div ui-view="context"></div>'),e.put("main/fields-selector.html",'<h2>Fields Selector<h2>Latitude:<select ng-model="vm.latitude" ng-options="str for str in vm.headers"></select>Longitude:<select ng-model="vm.longitude" ng-options="str for str in vm.headers"></select><button ng-click="vm.submit()">Submit</button></h2></h2>'),e.put("main/import.html",'<div class="import"><h2>import</h2>separator:<select ng-model="vm.separator" ng-options="key for (key, value) in vm.separators"></select><br><textarea class="csv" ng-model="vm.text">\n  </textarea> <button ng-click="vm.submit()">Submit</button></div>'),e.put("main/list.html",'<h2>List</h2><table ng-table="vm.tableParams"><tr ng-repeat="row in $data track by row.id"><td title="\'Id\'" sortable="\'id\'">{{row.id}}</td><td title="\'Latitude\'" sortable="\'latitude\'">{{row.latitude}}</td><td title="\'Longitude\'" sortable="\'longitude\'">{{row.longitude}}</td></tr></table>'),e.put("main/main.html",'<h1>Founder\'s Map</h1><div ui-view="main-context"></div>'),e.put("main/map.html",'Map<ui-gmap-google-map center="vm.map.center" zoom="vm.map.zoom" dragging="vm.map.dragging" draggable="true" control="map.control"><ui-gmap-marker ng-repeat="f in vm.founders" coords="f.coords" options="f.options" idkey="f.id"><ui-gmap-window ng-cloak=""><div><p>{{f.options.title}}</p></div></ui-gmap-window></ui-gmap-marker></ui-gmap-google-map>')}]);
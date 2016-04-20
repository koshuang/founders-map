// jscs:disable maximumLineLength

(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('mockFounders', [{
      'id': 1,
      'companyName': 'Google',
      'name': 'Larry Page & Sergey Brin',
      'city': 'Mountain View',
      'country': 'USA',
      'postalCode': 'CA 94043',
      'street': '1600 Amphitheatre Pkwy',
      'photo': 'http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg',
      'homePage': 'http://google.com',
      'latitude': 37.457674,
      'longitude': '-122.163452'
    }, {
      'id': 2,
      'companyName': 'Apple',
      'name': 'Steve Jobs & Steve Wozniak',
      'city': 'Cupertino',
      'country': 'USA',
      'postalCode': 'CA 95014',
      'street': '1 Infinite Loop',
      'photo': 'http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg',
      'homePage': 'http://apple.com',
      'latitude': 37.3403188,
      'longitude': '-122.0581469'
    }, {
      'id': 3,
      'companyName': 'Microsoft',
      'name': 'Bill Gates',
      'city': 'Redmond',
      'country': 'USA',
      'postalCode': 'WA 98052-7329',
      'street': 'One Microsoft Way',
      'photo': 'http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg',
      'homePage': 'http://microsoft.com',
      'latitude': 37.472189,
      'longitude': '-122.190191'
    }]);
})();

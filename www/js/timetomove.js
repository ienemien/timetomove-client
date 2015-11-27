// Time To Move App
(function () {
  'use strict';

  angular.module('timetomove', ['ionic', 'ngResource', 'ngMessages', 'ngCordova'])

    .constant('ApiEndpoint', {
      url: ''
    })

    //.constant('ApiEndpoint', {
    //  url: 'http://localhost:8080'
    //})

    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider

        .state('timetomove', {
          url: '/timetomove',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'TimeToMoveCtrl'
        })

        .state('timetomove.search', {
          url: '/search',
          views: {
            'menuContent': {
              templateUrl: 'templates/search.html'
            }
          }
        })

        .state('timetomove.browse', {
          url: '/browse',
          views: {
            'menuContent': {
              templateUrl: 'templates/browse.html'
            }
          }
        })

        /***** ACTIVITIES *****/
        .state('timetomove.activities', {
          url: '/activities',
          views: {
            'menuContent': {
              templateUrl: 'templates/activities.html',
              controller: 'ActivitiesCtrl as activitiesControl'
            }
          }
        })

        .state('timetomove.activities.all', {
          url: '/all',
          templateUrl: 'templates/activities-all.html'
        })

        .state('timetomove.activities.single', {
          url: '/edit',
          templateUrl: 'templates/activity.html'
        })

        .state('timetomove.activities.new', {
          url: '/new',
          templateUrl: 'templates/activity.html'
        });

      $urlRouterProvider.otherwise('/timetomove/activities/all');
    });
})();

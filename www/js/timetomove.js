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

        .state('timetomove.activities', {
          url: '/activities',
          views: {
            'menuContent': {
              templateUrl: 'templates/activities.html',
              controller: 'ActivitiesCtrl as activitiesControl',
              resolve: {
                activities: function (ActivitiesFactory) {
                  return ActivitiesFactory.query();
                }
              }
            }
          }
        })

        .state('timetomove.editactivity', {
          url: '/activities/edit/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/activity.html',
              controller: 'ActivityCtrl as activityControl',
              resolve: {
                activity: function ($stateParams, ActivitiesFactory) {
                  return ActivitiesFactory.get({id: $stateParams.id});
                }
              }
            }
          }
        })

        .state('timetomove.newactivity', {
          url: '/activities/new',
          views: {
            'menuContent': {
              templateUrl: 'templates/activity.html',
              controller: 'ActivityCtrl as activityControl'
            }
          },
          resolve: {
            activity: function () {
              return {};
            }
          }
        });

      $urlRouterProvider.otherwise('/timetomove/activities');
    });
})();

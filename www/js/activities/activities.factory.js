(function () {
  'use strict';

  angular
    .module('timetomove')
    .factory('ActivitiesFactory', ActivitiesFactory);

  function ActivitiesFactory($resource, ApiEndpoint) {
    return $resource(ApiEndpoint.url + '/api/activity/:id', {id: '@id'}, {
      update: {method: 'PUT'},
      query: {
        method: 'GET', isArray: true, transformResponse: function (data) {
          data = angular.fromJson(data);
          data.forEach(function (activity) {
            activity.start = new Date(activity.start);
            if(activity.end){activity.end = new Date(activity.end)}
          });
          return data;
        }
      },
      get: {
        method: 'GET',
        transformResponse: function (data) {
          data = angular.fromJson(data);
          data.start = new Date(data.start);
          data.end = new Date(data.end);
          return data;
        }
      },
      delete: {method: 'DELETE'}
    });
  }
})();

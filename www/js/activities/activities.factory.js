(function () {
  'use strict';

  angular
    .module('timetomove')
    .factory('ActivitiesFactory', ActivitiesFactory);

  function ActivitiesFactory($resource, ApiEndpoint) {
    return $resource(ApiEndpoint.url + '/activity/:id', {id: '@id'}, {
      update: {method: 'PUT'},
      query: {method: 'GET', isArray: true},
      get: {method: 'GET',
        transformResponse: function (data) {
          data = angular.fromJson(data);
          data.start = new Date(data.start);
          data.end = new Date(data.end);
          return data;}
      },
      delete: {method: 'DELETE'}
    });
  }
})();

(function () {
  'use strict';

  angular
    .module('timetomove')
    .factory('ActivitiesFactory', ActivitiesFactory);

  function ActivitiesFactory($resource, ApiEndpoint) {
    return $resource(ApiEndpoint.url + '/activity/:id', {id: '@id'}, {
      update: {method: 'PUT'},
      query: {method: 'GET', isArray: true},
      get: {method: 'GET'},
      delete: {method: 'DELETE'}
    });
  }
})();

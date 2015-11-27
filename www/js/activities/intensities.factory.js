(function () {
  'use strict';

  angular
    .module('timetomove')
    .factory('IntensitiesFactory', IntensitiesFactory);

  function IntensitiesFactory($resource, ApiEndpoint) {
    return $resource(ApiEndpoint.url + '/api/intensity', {id: '@id'}, {
      query: {
        method: 'GET', isArray: true
      }
    });
  }
})();

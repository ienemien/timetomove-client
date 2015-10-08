angular
  .module('timetomove')
  .factory('ActivitiesFactory', ActivitiesFactory);

function ActivitiesFactory($resource, ApiEndpoint) {
  return $resource(ApiEndpoint.url + '/activity/:id', {id: '@id'});
}

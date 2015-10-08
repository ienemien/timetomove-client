(function () {
  'use strict';

  angular
    .module('timetomove')
    .controller('ActivitiesCtrl', ActivitiesController);

  function ActivitiesController(activities) {
    var vm = this;
    vm.activities = activities;
  }
})();

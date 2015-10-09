(function () {
  'use strict';

  angular
    .module('timetomove')
    .controller('ActivityCtrl', ActivityController);

  function ActivityController(activity, ActivitiesFactory) {
    var vm = this;
    vm.activity = activity;
    vm.saveActivity = saveActivity;

    alert("In activitycontroller for activity with id" + activity.id);

    function saveActivity(activity) {
      ActivitiesFactory.save(activity);
      $state.go('timetomove.activities');
    }
  }
})();

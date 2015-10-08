(function () {
  'use strict';

  angular
    .module('timetomove')
    .controller('ActivityCtrl', ActivityController);

  function ActivityController(activity, ActivitiesFactory) {
    var vm = this;
    vm.activity = activity;
    vm.saveActivity = saveActivity;

    function saveActivity(activity) {
      alert('In save activity');
      ActivitiesFactory.save(activity);
    }
  }
})();

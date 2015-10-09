(function () {
  'use strict';

  angular
    .module('timetomove')
    .controller('ActivityCtrl', ActivityController);

  function ActivityController(activity, ActivitiesFactory, $state) {
    var vm = this;
    vm.activity = activity;
    vm.saveOrUpdate = saveOrUpdate;

    function saveOrUpdate(activity) {
      if (activity.id) {
        ActivitiesFactory.update(activity);
      }
      else {
        ActivitiesFactory.save(activity);
      }
      $state.go('timetomove.activities', null, {reload: true, inherit: false, notify: true});
    }
  }
})
();

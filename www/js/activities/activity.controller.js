(function () {
  'use strict';

  angular
    .module('timetomove')
    .controller('ActivityCtrl', ActivityController);

  function ActivityController(activity, ActivitiesFactory, $state, $cordovaDatePicker) {
    var vm = this;
    vm.activity = activity;
    vm.saveOrUpdate = saveOrUpdate;
    vm.cancel = cancel;
    vm.pickDatetime = pickDatetime;

    function saveOrUpdate(activity) {
      if (activity.id) {
        ActivitiesFactory.update(activity);
      }
      else {
        ActivitiesFactory.save(activity);
      }
      $state.go('timetomove.activities', null, {reload: true, inherit: false, notify: true});
    }

    function cancel() {
      $state.go('timetomove.activities', null, {reload: true, inherit: false, notify: true});
    }

    function pickDatetime(current) {
      var options = {
        date: Date.parse(current),
        mode: 'datetime',
        minuteInterval: 5
      }
      $cordovaDatePicker.show(options);
    }
  }
})
();

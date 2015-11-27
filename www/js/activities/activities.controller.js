(function () {
  'use strict';

  angular
    .module('timetomove')
    .controller('ActivitiesCtrl', ActivitiesController);

  function ActivitiesController($ionicPopup, $state, $scope, $cordovaDatePicker, ActivitiesFactory, IntensitiesFactory) {
    var vm = this;
    vm.activities = [];
    vm.intensities = [];
    vm.currentActivity = null;
    vm.editActivity = editActivity;
    vm.newActivity = newActivity;
    vm.deleteActivity = deleteActivity;
    vm.confirmDelete = confirmDelete;
    vm.doRefresh = doRefresh;
    vm.saveOrUpdate = saveOrUpdate;
    vm.cancel = cancel;
    vm.pickDatetime = pickDatetime;

    init();

    function init() {
      ActivitiesFactory.query(function success(data){
        vm.activities = data;
      });
      IntensitiesFactory.query(function success(data){
        vm.intensities = data;
      });
    }

    function saveOrUpdate(activity) {
      //$ionicPopup.alert({
      //  template: 'In save or update activity'
      //});
      if (activity.id) {
        ActivitiesFactory.update(activity, function success(){
          updateActivityInList(activity);
        }, function error(){
          $ionicPopup.alert({
            template: 'Oops, something went wrong...'
          });
        });
      }
      else {
        ActivitiesFactory.save(activity);
      }
      $state.transitionTo('timetomove.activities.all', {}, {reload: true, inherit: false, notify: true});
    }

    function updateActivityInList(changedActivity){
      var index = vm.activities.indexOf(changedActivity);
      vm.activities[index] = changedActivity;
    }

    function cancel() {
      $state.go('timetomove.activities.all', null, {reload: true, inherit: false, notify: true});
    }

    function pickDatetime(current) {
      var options = {
        date: Date.parse(current),
        mode: 'datetime',
        minuteInterval: 5
      };
      $cordovaDatePicker.show(options);
    }

    function editActivity(activity) {
      vm.currentActivity = activity;
      $state.go('timetomove.activities.single');
    }

    function newActivity() {
      $state.go('timetomove.newactivity');
    }

    function deleteActivity(id) {
      ActivitiesFactory.delete({id: id});
      $state.transitionTo($state.current, {}, {reload: true, inherit: false, notify: true});
    }

    function confirmDelete(activity) {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Activity',
        template: 'Are you sure you want to delete \'' + activity.type + '\'?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          deleteActivity(activity.id);
        }
      });
    }

    function doRefresh() {
      $state.transitionTo($state.current, {}, {reload: true, inherit: false, notify: true});
      $scope.$broadcast('scroll.refreshComplete');
    }
  }
})();

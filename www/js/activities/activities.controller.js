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
      }, function error(){
        $ionicPopup.alert({
          template: 'Could not retrieve activities, try again later.'
        })
      });
      IntensitiesFactory.query(function success(data){
        vm.intensities = data;
      }, function error(){
        $ionicPopup.alert({
          template: 'Could not retrieve activities, try again later.'
        })
      });
    }

    function saveOrUpdate(activity) {
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
        ActivitiesFactory.save(activity, function success(){
          vm.activities.push(activity);
        }, function error(){
          $ionicPopup.alert({
            template: 'Oops, something went wrong...'
          });
        });
      }
      $state.transitionTo('timetomove.activities.all');
    }

    function updateActivityInList(changedActivity){
      var index = vm.activities.indexOf(changedActivity);
      vm.activities[index] = changedActivity;
    }

    function cancel() {
      $state.go('timetomove.activities.all');
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
      $state.go('timetomove.activities.new');
    }

    function deleteActivity(activity) {
      ActivitiesFactory.delete({id: activity.id}, function success(){
        var index = vm.activities.indexOf(activity);
        vm.activities.splice(index, 1);
      }, function error(){
        $ionicPopup.alert({
          template: 'Oops, something went wrong...'
        });
      });
    }

    function confirmDelete(activity) {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Activity',
        template: 'Are you sure you want to delete \'' + activity.type + '\'?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          deleteActivity(activity);
        }
      });
    }

    function doRefresh() {
      ActivitiesFactory.query(function success(data){
        vm.activities = data;
        $scope.$broadcast('scroll.refreshComplete');
      }, function error(){
        $ionicPopup.alert({
          template: 'Could not retrieve activities, try again later.'
        })
      });
    }
  }
})();

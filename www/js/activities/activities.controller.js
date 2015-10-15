(function () {
  'use strict';

  angular
    .module('timetomove')
    .controller('ActivitiesCtrl', ActivitiesController);

  function ActivitiesController(activities, $ionicPopup, $state, ActivitiesFactory) {
    var vm = this;
    vm.activities = activities;
    vm.editActivity = editActivity;
    vm.newActivity = newActivity;
    vm.deleteActivity = deleteActivity;
    vm.confirmDelete = confirmDelete;
    //vm.doRefresh = doRefresh;

    function editActivity(id) {
      $ionicPopup.alert({
        template: 'In edit activity'
      });
      $state.go('timetomove.editactivity', {id: id});
    }

    function newActivity() {
      $state.go('timetomove.newactivity');
    }

    function deleteActivity(id) {
      ActivitiesFactory.delete({id: id});
      $state.go($state.current, {}, {reload: true});
    }

    function confirmDelete(activity) {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Activity',
        template: 'Are you sure you want to delete \'' + activity.type + '\'?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          console.log('Delete activity');
          deleteActivity(activity.id);
        } else {
          console.log('You are not sure');
        }
      });
    }

    //function doRefresh() {
    //  ActivitiesFactory.query().$promise.then(
    //    function(activities) {
    //      $ionicPopup.alert({
    //        template: 'in then'
    //      });
    //      vm.activities = activities;
    //      vm.$broadcast('scroll.refreshComplete');
    //    });
    //}
  }
})();

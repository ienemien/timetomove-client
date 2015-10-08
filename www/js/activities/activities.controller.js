(function () {
  'use strict';

  angular
    .module('timetomove')
    .controller('ActivitiesCtrl', ActivitiesController);

  function ActivitiesController(activities, $ionicPopup, $state, ActivitiesFactory) {
    var vm = this;
    vm.activities = activities;
    vm.showActivity = showActivity;
    vm.newActivity = newActivity;
    vm.deleteActivity = deleteActivity;
    vm.confirmDelete = confirmDelete;

    function showActivity(id) {
      alert("in show activity");
      return "/activities/" + id;
    }

    function newActivity() {
      $state.go('timetomove.new');
    }

    function deleteActivity(id) {
      ActivitiesFactory.delete({id: id});
      $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    }

    function confirmDelete(activity) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Activity',
        template: 'Are you sure you want to delete \'' + activity.type + '\'?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('Delete activity');
          deleteActivity(activity.id);
        } else {
          console.log('You are not sure');
        }
      });
    }
  }
})();

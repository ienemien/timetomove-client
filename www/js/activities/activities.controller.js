(function () {
  'use strict';

  angular
    .module('timetomove')
    .controller('ActivitiesCtrl', ActivitiesController);

  function ActivitiesController(activities, $ionicPopup, $state, ActivitiesFactory) {
    var vm = this;
    vm.activities = activities;
    vm.showActivity = showActivity;
    vm.deleteActivity = deleteActivity;
    vm.confirmDelete = confirmDelete;

    function showActivity(id) {
      alert("in show activity");
      return "/activities/" + id;
    }

    function deleteActivity(id) {
      ActivitiesFactory.delete({id: id});
      $state.reload();
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

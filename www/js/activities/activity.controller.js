(function () {
  'use strict';

  angular
    .module('timetomove')
    .controller('ActivityCtrl', ActivityController);

  function ActivityController(activity) {
    var vm = this;
    vm.activity = activity;
  }
})();

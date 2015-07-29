angular.module('ddysys.controllers')


//--------- tab controller ---------//
.controller('tabCtrl', function($scope, $state, $rootScope) {



})


//--------- 首页 controller ---------//
.controller('HomeCtrl', function($scope, $state) {

  $scope.goEvents = function() {
    $state.go('tab.events')
  }

})


//--------- 日程列表页 controller ---------//
.controller('HomeEventsCtrl', function($scope, $state) {



})
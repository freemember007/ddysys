angular.module('ddysys.controllers')


//--------- tab controller ---------//
.controller('tabCtrl', function($scope, $state, $rootScope) {
  $scope.settings = {
    isTab1: true,
  }

  $scope.active = function(tab){
    $scope.settings = {
      isTab1: false,
      isTab2: false,
      isTab3: false,
      isTab4: false
    }
    $scope.settings[tab] = true;
  }
  

})


//--------- 首页 controller ---------//
.controller('HomeCtrl', function($scope, $localStorage) {

  $scope.user = $localStorage.getObject('user');

})


//--------- 日程列表页 controller ---------//
.controller('HomeEventsCtrl', function($scope, $state) {



})
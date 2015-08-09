angular.module('ddysys.controllers')

.controller('ResetPasswdVerifyCtrl', function($scope, $http, $state) {
  $scope.goResetPasswd = function() {
    $state.go("reset_passwd")
  }
  $scope.getCaptcha = function(){
    alert(1)
  }
})

.controller('ResetPasswdCtrl', function($scope, $http, $state) {
  $scope.doResetPasswd = function() {
    $state.go("login")
  }
})
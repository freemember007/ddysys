angular.module('ddysys.controllers')


//--------- 我的controller ---------//
.controller('AccountCtrl', function($scope, $state, $localStorage, $ionicHistory) {
  
  $scope.user = $localStorage.getObject('user');
  
  $scope.doLogout = function() {
    $state.go('login')
  };


  $scope.goInfo = function() {
    // $state.go('account_info');
    $state.go('tab.account_info');
  }

})


//--------- 个人资料controller ---------//
.controller('AccountInfoCtrl', function($scope, $state, $localStorage) {
  
  $scope.user = $localStorage.getObject('user');
  
  $scope.doLogout = function() {
    $state.go('login')
  }

});
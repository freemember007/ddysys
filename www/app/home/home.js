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
.controller('HomeCtrl', function($scope, $localStorage, PostData, $http) {

  $scope.user = $localStorage.getObject('user');
  var postData = new PostData('appindex');

  $http.post('api', postData).then(function(data){
    if(!data)return;
    $scope.docSchedules = data.dsList.slice(0,2);
    $scope.UserMessages = data.umList;
  })

})
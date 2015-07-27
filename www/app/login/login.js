angular.module('ddysys.controllers')

.controller('LoginCtrl', function($scope, $state, $http, $md5, $localStorage) {

  $scope.user = {};

  $scope.doLogin = function() {
    var postData = {
      service: 'applogin', 
      mobileno: $scope.user.mobileno, 
      pwd: $md5.createHash($scope.user.pwd)
    }
    $http.post('api', postData).then(
      function(data){
      if(data){
        $localStorage.set('token', data.token);
        $localStorage.setObject('user', data.docInfo);
        $state.go("tab.home")
      }
    })

  }

})
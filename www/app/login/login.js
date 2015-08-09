angular.module('ddysys.controllers')

.controller('LoginCtrl', function($scope, $state, PostData, $http, $md5, $localStorage) {

  $scope.user = {};

  $scope.doLogin = function() {
    var postData = new PostData('applogin');
    postData.mobileno = $scope.user.mobileno;
    postData.pwd = $md5.createHash($scope.user.pwd);
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
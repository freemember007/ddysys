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
        $localStorage.setObject('user', data.docInfo);
        $localStorage.setObject('doctor', data.yyysList[0]);

        switch (data.docInfo.dAuth) {
          case '0':
            $state.go("register_upload");
            break;
          case '1':
            $state.go("register_waiting");
            break;
          case '2':
            $localStorage.set('token', data.token);
            $state.go("tab.home");
            break;
          case '3':
            $state.go("register_waiting")
            break;
        }
      }
    })

  }

})
angular.module('ddysys.controllers')

.controller('LoginCtrl', function($scope, $state, PostData, $md5, $system, $http, $localStorage) {

  $scope.user = {};

  $scope.doLogin = function() {
    var postData = new PostData('applogin');
    postData.mobileno = $scope.user.mobileno;
    postData.pwd = $md5.createHash($scope.user.pwd);
    $http.post('api', postData).then(
      function(data){
      if(data){
        if(data.type == 3){
          $localStorage.set('assistenToken', data.token);
          $localStorage.setObject('doctors', data.yyysList);
          console.log('我是助理');
          $state.go("dock");
        }else if(data.type == 2){
          $system.alert('您不是医生，请使用医生或医生助理帐户登录！');
        }else{
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
      }
    })
  }
})

.controller('DockCtrl', function($scope, $state, PostData, $http, $localStorage, $ionicHistory, $rootScope) {

  $scope.doctors = $localStorage.getObject('doctors');

  $scope.switchDoctor = function(index){
    var doctor = $scope.doctors[index];
    var postData = new PostData('appchangelogin');
    postData.token = $localStorage.get('assistenToken');
    postData.did = doctor.did;
    postData.docId = doctor.docId;
    postData.hosId = doctor.hosId;

    $http.post('api', postData).then(function(data){
      if(data){

        // 清不清意义不大
        // $localStorage.clear();
        // $localStorage.set('assistenToken', postData.token);
        // $localStorage.setObject('doctors', $scope.doctors);

        $localStorage.setObject('user', data.docInfo);
        $localStorage.setObject('doctor', data.yyysList[0]);
        $localStorage.set('token', data.token);
        $ionicHistory.clearCache(); // 重要，否则四个tab页不会刷新
        $state.go("tab.home");
        $rootScope.initHome(); // 重要，否则首页不会刷新
      }
    })
  }
  $scope.doLogout = function() {
    var postData = new PostData('applogout');
    postData.token = $localStorage.get('assistenToken');
    $http.post('api', postData).then(
      function(data){
      if(data){
        $localStorage.clear();
        $ionicHistory.clearCache();
        $state.go('login')
      }
    });
  };
})
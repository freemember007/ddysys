angular.module('ddysys.controllers')

.controller('ResetPasswdVerifyCtrl', function($scope, PostData, $http, $state, $system, $localStorage, _) {

  $scope.user = {};

  $scope.getCaptcha = function(){
    var postData = new PostData('appcaptcha');
    postData.mobileno = $scope.user.mobileno;
    postData.type = '4';
    postData.ctype = '3';
    $http.post('api', postData).then(function(data){
      if(data){
        $scope.user.captcha = data.captcha;
        $localStorage.setObject('resetPwdInfo',$scope.user);
        $system.toast('验证码已下发至手机' + $scope.user.mobileno + '，请查看短信后填写。');
        $scope.getCaptcha = _.debounce($scope.getCaptcha, 30000, true);
      }
    })
  }

  $scope.goResetPasswd = function() {
    if($scope.user.inputCaptcha !== $scope.user.captcha){
      $system.alert('验证码不正确！请查看短信后重新填写。若需再次获取验证码，请等待30秒');
    }else{
      $state.go("reset_passwd")
    }
  }

})

.controller('ResetPasswdCtrl', function($scope, $state, $localStorage, $http, PostData, $md5, $system) {
  
  $scope.modData = $localStorage.getObject('resetPwdInfo',{});

  $scope.doResetPasswd = function(){
    var postData = new PostData('appfindpwd');
    delete postData.token
    postData.mobileno = $scope.modData.mobileno;
    postData.captcha = $scope.modData.captcha;
    postData.newpwd = $md5.createHash($scope.modData.newpwd);
    $http.post('api', postData).then(function(data){
      if(data && data.succ) {
        $system.alert('密码重置成功！请返回登录。');
        $state.go('login');
      }
    })
  }

})
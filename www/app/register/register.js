angular.module('ddysys.controllers')

//--------- 验证手机controller ---------//
.controller('RegisterVerifyCtrl', function($scope, $state, $http, $localStorage) {

  $scope.user = {
    agree: true,
  }; 

  var params = {
    service: 'appcaptcha',
    type: '1',
    ctype: '3'
  };


  $scope.getCaptcha = function(){
    params.mobileno = $scope.user.mobileno;
    $http.post('api', params).then(function(data){
      if(data){
        $scope.user.captcha = data.captcha
      }
    })
  }

  $scope.goRegister = function() {
    if (!$scope.form.mobileno.$valid) {
      alert('请正确填写手机号！')
    } else if (!$scope.form.captcha.$valid){
      alert('请获取6位数验证码！')
    } else if (!$scope.user.agree) {
      alert('请同意使用协议！')
    } else {
      $localStorage.setObject('user', $scope.user);
      $state.go('register');
    }
  };

})


//--------- 注册controller ---------//
.controller('RegisterCtrl', function($scope, $state, $http, $localStorage, $md5) {

  var localUser = $localStorage.getObject('user'); // 注意：若页面是缓存的，如前进后退，此步不会执行

  var params = {
    service: 'appregister',
    type: '1',
  };
  $scope.user = {
    dMobile: localUser.mobileno,
    captcha: localUser.captcha,
    dSex: '男',
    dDept: '外科',
    dTitle: '主任医师'
  };

  $scope.goRegisterUpload = function() {
    if (!$scope.form.name.$valid) {
      alert('请填写真实姓名！')
    } else if (!$scope.form.pwd.$valid){
      alert('请输入4-20位密码！')
    } else if (!$scope.form.hos.$valid) {
      alert('请填写您所在的医院！')
    } else {
      angular.extend(params, $scope.user);
      params.dPassword = $md5.createHash(params.dPassword);
      $http.post('api', params).then(function(data){
        if(data){
          $localStorage.setObject('user', data.docInfo);
          $state.go('register_upload');
        }
      })
    }
  }
})


//--------- 上传证件controller ---------//
.controller('RegisterUploadCtrl', function($scope, $state, $http, $localStorage, $imageHelper, $fileHelper, $cordovaDialogs) {

  $scope.user = {
    identityImg: 'img/photo_upload.png'
  }

  $scope.upload = function() {
    $imageHelper.choose(function(status){
        $imageHelper.getImage(status, function(imageURL){
          $fileHelper.upload(imageURL, {service: 'appuploadimg', type: '2'}, function(res){
            $cordovaDialogs.alert('图片上传成功，请点击右上角的提交按钮。', '提示', '确定')
            if(res && res.filePath) $scope.user.identityImg = res.filePath;
          })
        })
    })
  }

  $scope.submit = function(){
    var params = {
      service: 'appuploadlicense',
      did: $localStorage.getObject('user').did,
      dLicenseUrl: $scope.user.identityImg
    };
    $http.post('api', params).then(function(data){
      if(data && data.succ) $state.go('register_waiting')
    })
  }

})


//--------- 等待审核controller ---------//
.controller('RegisterWaitingCtrl', function($scope, $state) {
  $scope.exit = function() {
    $state.go('login');
  }
})
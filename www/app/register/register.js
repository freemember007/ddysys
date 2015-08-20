angular.module('ddysys.controllers')

//--------- 验证手机controller ---------//
.controller('RegisterVerifyCtrl', function($scope, $state, PostData, $http, $localStorage, $system) {

  $scope.user = {
    agree: true,
  }; 

  $scope.getCaptcha = function(){
    var postData = new PostData('appcaptcha');
    postData.type = '1';
    postData.ctype = '3';
    postData.mobileno = $scope.user.mobileno;
    $http.post('api', postData).then(function(data){
      if(data){
        $scope.user.captcha = data.captcha
      }
    })
  }

  $scope.goRegister = function() {
    if (!$scope.form.mobileno.$valid) {
      $system.alert('请正确填写手机号！')
    } else if (!$scope.form.captcha.$valid){
      $system.alert('请获取6位数验证码！')
    } else if (!$scope.user.agree) {
      $system.alert('请同意使用协议！')
    } else {
      $localStorage.setObject('user', $scope.user);
      $state.go('register');
    }
  };

})


//--------- 注册controller ---------//
.controller('RegisterCtrl', function($scope, $state, PostData, $http, $localStorage, $md5, $system) {

  var localUser = $localStorage.getObject('user'); // 注意：若页面是缓存的，如前进后退，此步不会执行

  var postData = new PostData('appregister');
  postData.type = '1';
  $scope.user = {
    dMobile: localUser.mobileno,
    captcha: localUser.captcha,
    dSex: '男',
    dDept: '外科',
    dTitle: '主任医师'
  };

  $scope.goRegisterUpload = function() {
    if (!$scope.form.name.$valid) {
      $system.alert('请填写真实姓名！')
    } else if (!$scope.form.pwd.$valid){
      $system.alert('请输入4-20位密码！')
    } else if (!$scope.form.hos.$valid) {
      $system.alert('请填写您所在的医院！')
    } else {
      angular.extend(postData, $scope.user);
      postData.dPassword = $md5.createHash(postData.dPassword);
      $http.post('api', postData).then(function(data){
        if(data){
          $localStorage.setObject('user', data.docInfo);
          $state.go('register_upload');
        }
      })
    }
  }
})


//--------- 上传证件controller ---------//
.controller('RegisterUploadCtrl', function($scope, $state, PostData, $http, $localStorage, $imageHelper, $fileHelper, $system) {

  $scope.user = {
    identityImg: 'img/photo_upload.png'
  }

  $scope.upload = function() {
    $imageHelper.choose(function(status){
        $imageHelper.getImage(status, function(imageURL){
          $fileHelper.upload(imageURL, {service: 'appuploadimg', type: '2'}, function(res){
            $system.alert('图片上传成功，请点击右上角的提交按钮。')
            if(res && res.filePath) $scope.user.identityImg = res.filePath;
          })
        }, true)
    })
  }

  $scope.submit = function(){
    var postData = new PostData('appuploadlicense');
    postData.did = $localStorage.getObject('user').did;
    postData.dLicenseUrl = $scope.user.identityImg;
    $http.post('api', postData).then(function(data){
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
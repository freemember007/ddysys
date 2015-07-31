angular.module('ddysys.controllers')


//--------- 我的controller ---------//
.controller('AccountCtrl', function($scope, $state, $localStorage, $cordovaToast) {

  $scope.user = $localStorage.getObject('user');

  $scope.goInfo = function() {
    // $state.go('account_info');
    $state.go('tab.account_info');
  }

  $scope.goValue = function() {
    // $state.go('tab.account_value')
    $cordovaToast.showShortBottom('暂无评价！')

  }

  $scope.goBarcode = function() {
    $state.go('tab.account_barcode')
  }

  $scope.goTimetable = function() {
    // $state.go('tab.account_timetable')
    $cordovaToast.showShortBottom('暂无时间表！')
  }

  $scope.goSet = function() {
    $state.go('tab.account_set')
  }

  $scope.goModpwd = function() {
    $state.go('tab.account_modpwd')
  }

  $scope.doLogout = function() {
    $state.go('login')
  };

})


//--------- 评价controller ---------//
.controller('AccountRateCtrl', function($scope, $state, $localStorage) {

  $scope.user = $localStorage.getObject('user');

})


//--------- 二维码controller ---------//
.controller('AccountBarcodeCtrl', function($scope, $state, $localStorage) {

  $scope.user = $localStorage.getObject('user');

})


//--------- 出诊时间controller ---------//
.controller('AccountTimetableCtrl', function($scope, $state, $localStorage) {

  $scope.user = $localStorage.getObject('user');

})


//--------- 个人资料controller ---------//
.controller('AccountInfoCtrl', function($scope, $state, $http, $localStorage, $imageHelper, $fileHelper, $cordovaToast) {

  $scope.user = $localStorage.getObject('user');

  $scope.uploadAvatar = function() {
    $imageHelper.choose(function(status){
        $imageHelper.getImage(status, function(imageURL){
          $fileHelper.upload(imageURL, {service: 'appuploadimg', type: '1'}, function(res){
            if(res && res.filePath) {
              $scope.user.dFaceUrl = res.filePath;
              submit($scope.user.dFaceUrl);
            }
          })
        })
    })
  }

  function submit(imgUrl){
    var params = {
      service: 'appmodperinfo',
      type: '1',
      token: $localStorage.get('token'),
      did: $localStorage.getObject('user').did,
      faceUrl: imgUrl
    };
    $http.post('api', params).then(function(data){
      if(data && data.succ) {
        $cordovaToast.showShortBottom('头像上传成功！');
        $localStorage.setObject('user', data.docInfo);
      }
    })
  }

})


//--------- 设置controller ---------//
.controller('AccountSetCtrl', function($scope, $state, $localStorage) {

  $scope.user = $localStorage.getObject('user');

})


//--------- 修改密码controller ---------//
.controller('AccountModpwdCtrl', function($scope, $state, $localStorage) {

  $scope.user = $localStorage.getObject('user');

})


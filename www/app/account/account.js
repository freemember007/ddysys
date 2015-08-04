angular.module('ddysys.controllers')


//--------- 我的controller ---------//
.controller('AccountCtrl', function($scope, $state, $localStorage, $cordovaToast) {

  $scope.user = $localStorage.getObject('user');

  $scope.doLogout = function() {
    $state.go('login')
  };

})


//--------- 评价列表controller ---------//
.controller('AccountRateCtrl', function($scope, $state, $http, $localStorage) {

  var postData = {
    service: 'appuserratelist', 
    token: $localStorage.get('token')
  }
  $http.post('api', postData).then(
    function(data){
    if(data){
      $scope.summary = data.userRate;
      $scope.rates = data.list;
    }
  });

  $scope.point2Arr = function(point){
    var arr = new Array(5);
    for(var i=0; i<point; i++){
      arr[i] = true;
    };
    console.log(1)
    return arr;
  }

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


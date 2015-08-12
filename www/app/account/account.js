angular.module('ddysys.controllers')


//--------- 我的controller ---------//
.controller('AccountCtrl', function($scope, $state, $localStorage, $cordovaToast) {

  $scope.$on( "$ionicView.enter", function(){
    $scope.active('isTab4');
  })
  $scope.user = $localStorage.getObject('user');

  $scope.doLogout = function() {
    $state.go('login')
  };

})


//--------- 评价列表controller ---------//
.controller('AccountRateCtrl', function($scope, $http, PostData) {

  var postData = new PostData('appuserratelist');
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
    return arr;
  }

})


//--------- 二维码controller ---------//
.controller('AccountBarcodeCtrl', function($scope, $http, $localStorage, badge) {

  badge.plus('home',1) //just test
  $scope.user = $localStorage.getObject('user');
  $scope.doctor = $localStorage.getObject('doctor');

})


//--------- 出诊时间controller ---------//
.controller('AccountTimetableCtrl', function($scope, $http, PostData,$rootScope) {

  var postData = new PostData('appdocScheme');
  postData.orgid = '157502';
  postData.docid = '32647';

  $http.post('api', postData).then(function(data){
    if(!data) return;
    var list = data.list;
    var arr = [
      {day:'周一', am:false, pm:false, eve:false}, 
      {day:'周二', am:false, pm:false, eve:false}, 
      {day:'周三', am:false, pm:false, eve:false}, 
      {day:'周四', am:false, pm:false, eve:false}, 
      {day:'周五', am:false, pm:false, eve:false}, 
      {day:'周六', am:false, pm:false, eve:false}, 
      {day:'周日', am:false, pm:false, eve:false}
    ];

    if(list && list.length){
      for(var i=0; i<list.length; i++){
        var dateStr = list[i].schdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        var date = new Date(dateStr);
        var day = date.getDay();
        if(list[i].ampm === '1'){
          arr[day-1].am = true;
        }else{
          arr[day-1].pm = true;
        };
      }
    }

    $scope.schedules = arr;
  });

})


//--------- 个人资料controller ---------//
.controller('AccountInfoCtrl', function($scope, $state, $http, PostData, $localStorage, $imageHelper, $fileHelper, $cordovaToast) {

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
    var postData = new PostData('appmodperinfo');
    postData.type = '1';
    postData.did = $localStorage.getObject('user').did;
    postData.faceUrl = imgUrl;
    
    $http.post('api', postData).then(function(data){
      if(data && data.succ) {
        $cordovaToast.showShortBottom('头像上传成功！');
        $localStorage.setObject('user', data.docInfo);
      }
    })
  }

})


//--------- 设置controller ---------//
.controller('AccountSetCtrl', function($scope, $http, $localStorage) {

  $scope.user = $localStorage.getObject('user');

})


//--------- 修改密码controller ---------//
.controller('AccountModpwdCtrl', function($scope, $state, $http, PostData, $md5) {

  $scope.modData = {};

  var postData = new PostData('appresetpwd');

  $scope.doModpwd = function(){
    postData.pwd = $md5.createHash($scope.modData.pwd);
    postData.newpwd = $md5.createHash($scope.modData.newpwd);
    $http.post('api', postData).then(function(data){
      if(data && data.succ) {
        console.log('成功！');
      }
    })
  }

})


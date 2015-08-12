angular.module('ddysys.controllers')


//--------- 患者列表controller ---------//
.controller('PatientsCtrl', function($scope, Patients, badge) {

  $scope.$on( "$ionicView.enter", function(){
    $scope.active('isTab2');
  })
  sortList(Patients.getLocal())

  Patients.all().then(function(data) {
    if(!data) return;
    var list = _.sortBy(data.docPatientVoList, 'patId');
    badge.set('patients', _.countBy(list, {status: "0"}).true);
    Patients.setLocal(list);
    sortList(Patients.getLocal())
  })

  function sortList(list){
    list = _.where(list, {status: "1"});
    console.log(list)
    _.each(list, function(element){
        if(element.yhxb === '男'){
          element.faceUrl = element.faceUrl || 'img/default_male_head_photo1.png';
        } else {
          element.faceUrl = element.faceUrl || 'img/default_female_head_photo1.png';
        }
    });
    list = _.groupBy(list, function(item){
      return item.star;
    });
    $scope.patientsGroup = _.pairs(list).reverse();
  }

})


//--------- 患者详情controller ---------//
.controller('PatientsDetailCtrl', function($scope, Patients, $stateParams, $cordovaToast) {

  Patients.getById($stateParams.patientId).then(function(data){
    if(!data) return;
    $scope.patient = data.pat;
    $scope.stared = $scope.patient.star === '1' ? true : false;
  });

  $scope.star = function(patientId, stared){
    Patients.star(patientId, stared).then(function(data){
      if(!data) return;
      $cordovaToast.showShortBottom(stared === true ? '收藏成功！' : '取消收藏成功！');
    })
  }

})

//--------- 患者请求列表controller ---------//
.controller('PatientsRequestsCtrl', function($scope, Patients) {

  Patients.all({status: 0}).then(function(data){
    if(!data) return;
    $scope.patients = data.docPatientVoList;
  })


})

//--------- 患者请求详情controller ---------//
.controller('PatientsRequestsDetailCtrl', function($scope, Patients, $stateParams, $cordovaToast, $ionicHistory) {

  Patients.getById($stateParams.patientId).then(function(data){
    if(!data) return;
    $scope.patient = data.pat;
  })

  $scope.handleRequest = function(patientId, status){
    Patients.handleRequest(patientId, status).then(function(data){
      if(!data)return;
      $cordovaToast.showShortBottom(status === 1 ? '您接受了该患者。' : '您拒绝了该患者。');
      $ionicHistory.goBack();
    })
  }

})

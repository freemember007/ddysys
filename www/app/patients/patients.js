angular.module('ddysys.controllers')


//--------- 患者列表controller ---------//
.controller('PatientsCtrl', function($scope, $state, $http, $localStorage) {

  $scope.patients = $localStorage.getObject('patients');

  var postData = {
    service: 'appalldocpatientlist',
    token: $localStorage.get('token')
  }

  // $scope.$on('$ionicView.enter', function(e) {
    $http.post('api', postData).then(function(data) {
      if(!data)return;
      $scope.patients = data.docPatientVoList;
      for(var i=0; i<$scope.patients.length; i++){
        var patient = $scope.patients[i];
        if(!patient.faceUrl){
          if(patient.yhxb === '男'){
            patient.faceUrl = 'img/default_male_head_photo1.png';
          } else {
            patient.faceUrl = 'img/default_female_head_photo1.png';
          }
        }
      }
      $localStorage.setObject('patients', $scope.patients)
    })
  // });

})


//--------- 患者详情controller ---------//
.controller('PatientsDetailCtrl', function($scope, $state, $http, $localStorage) {



})
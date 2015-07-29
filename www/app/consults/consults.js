angular.module('ddysys.controllers')


//--------- 咨询列表controller ---------//
.controller('ConsultsCtrl', function($scope, _consults) {

  $scope.consults = _consults.list;
  console.log($scope.consults[0]);
  $scope.type = '我的咨询';
  $scope.setType = function(event) {
    $scope.type = angular.element(event.target).text();
    console.log($scope.type);
  };

})


//--------- 患者详情controller ---------//
.controller('ConsultsDetailCtrl', function($scope, _consult) {
  console.log(_consult.userConsultForm)
  console.log(_consult.list[0])
  $scope.consult = _consult.userConsultForm;
  $scope.replies = _consult.list;
})
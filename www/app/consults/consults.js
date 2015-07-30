angular.module('ddysys.controllers')


//--------- 咨询列表controller ---------//
.controller('ConsultsCtrl', function($scope, consults) {

  $scope.consults = consults.list;
  console.log($scope.consults[0]);
  $scope.type = '我的咨询';
  $scope.setType = function(event) {
    $scope.type = angular.element(event.target).text();
    console.log($scope.type);
  };

})


//--------- 患者详情controller ---------//
.controller('ConsultsDetailCtrl', function($scope, consult) {
  console.log(consult.userConsultForm)
  console.log(consult.list[0])
  $scope.consult = consult.userConsultForm;
  $scope.replies = consult.list;
})
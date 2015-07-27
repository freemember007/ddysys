angular.module('ddysys.controllers')


//--------- 咨询列表controller ---------//
.controller('ConsultsCtrl', function($scope, _consults) {

  $scope.consults = _consults.list;
  console.log($scope.consults[0])

})


//--------- 患者详情controller ---------//
.controller('ConsultsDetailCtrl', function($scope, $stateParams, Consults) {
  $scope.consult = Consults.get($stateParams.consultId);
})
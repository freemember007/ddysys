angular.module('ddysys.controllers')


//--------- 聊天controller ---------//
.controller('MessagesCtrl', function($scope, Messages, $stateParams, $localStorage, _) {

  Messages.all($stateParams.patientId).then(function(data){
    if(!data)return;
    $scope.messages = data.list;
  });

  $scope.user = $localStorage.getObject('user');

  $scope.toUser = _.findWhere($localStorage.getObject('patients'), {patId: Number($stateParams.patientId)});

})

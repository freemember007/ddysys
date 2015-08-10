angular.module('ddysys.controllers')


//--------- 聊天controller ---------//
.controller('MessagesCtrl', function($scope, $ionicScrollDelegate, Messages, $stateParams, $localStorage, _, PostData, $http) {

  $scope.user = $localStorage.getObject('user');
  $scope.toUser = _.findWhere($localStorage.getObject('patients'), {patId: Number($stateParams.patientId)});
  $scope.input = {};

  function init(){
    Messages.all($stateParams.patientId).then(function(data){
      if(!data)return;
      $scope.messages = _.sortBy(data.list, 'sentTime');
      $ionicScrollDelegate.scrollBottom();
    });
  }

  init();

  $scope.sendMessage = function(){
    var postData = new PostData('appsendmessage');
    postData.patId = $stateParams.patientId;
    postData.msgType = 'T';
    postData.msgContent = $scope.input.message;
    $http.post('api', postData).then(function(data){
      if(!data) return;
      $scope.input.message = '';
      init();
    })
  }

})
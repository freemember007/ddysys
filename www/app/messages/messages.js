angular.module('ddysys.controllers')


//--------- 聊天controller ---------//
.controller('MessagesCtrl', function($scope, Messages, $stateParams, $localStorage, _, PostData, $http) {

  $scope.user = $localStorage.getObject('user');
  $scope.toUser = _.findWhere($localStorage.getObject('patients'), {patId: Number($stateParams.patientId)});

  Messages.all($stateParams.patientId).then(function(data){
    if(!data)return;
    $scope.messages = data.list;
  });

  $scope.sendMessage = function(){
    var postData = new PostData('appsendmessage');
    postData.patId = $stateParams.patientId;
    postData.msgType = 'T';
    postData.msgContent = '测试回复';
    $http.post('api', postData).then(function(data){
      if(!data) return;
      alert('回复成功！')
    })
  }

})

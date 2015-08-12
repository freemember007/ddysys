angular.module('ddysys.controllers')


//--------- 咨询列表controller ---------//
.controller('ConsultsCtrl', function($scope, Consults) {

  $scope.$on( "$ionicView.enter", function(){
    $scope.active('isTab3');
  })
  $scope.setType = function(type) {
    $scope.type = type;
    Consults.all(type).then(function(data){
      if(!data) return;
      $scope.consults = data.list;
    })
  }

  $scope.setType('DS');

})


//--------- 咨询详情controller ---------//
.controller('ConsultsDetailCtrl', function($scope, $localStorage, Consults, $stateParams) {
  
  $scope.reply = {};
  $scope.user = $localStorage.getObject('user');

  Consults.get($stateParams.consultId).then(function(data){
    if(!data) return;
    $scope.consult = data.userConsultForm;
    $scope.replies = data.list;
  })

  $scope.doReply = function() {
    Consults.reply($scope.consult.consultId, $scope.reply.content).then(function(data){
      if(!data) return;
      // $scope.consult = data.userConsultForm; //接口没有传加userConsultForm对象
      $scope.replies.unshift({
        replyContent: $scope.reply.content,
        replyName: $scope.user.dName,
        replyTime: new Date(),
        replyFaceUrl: $scope.user.dFaceUrl,
      })
      $scope.reply.content = ''
    })
  }

})
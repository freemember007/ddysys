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

  $scope.$on( "$ionicView.enter", function(){
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.disableScroll(true);
    }
  });

  $scope.$on( "$ionicView.leave", function(){
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.disableScroll(false);
    }
  })
  
  $scope.consult={};
  $scope.reply = {};
  $scope.user = $localStorage.getObject('user');

  function init(){
    Consults.get($stateParams.consultId).then(function(data){
      if(!data) return;
      $scope.consult = data.userConsultForm;
      $scope.replies = data.list;
    })
  }

  init()

  $scope.doReply = function() {
    Consults.reply($scope.consult.consultId, $scope.reply.content).then(function(data){
      if(!data) return;
      // $scope.consult = data.userConsultForm; //接口没有传加userConsultForm对象
      init();
      $scope.reply.content = ''
      // $scope.replies.unshift({
      //   replyContent: $scope.reply.content,
      //   replyName: $scope.user.dName,
      //   replyTime: new Date(),
      //   replyFaceUrl: $scope.user.dFaceUrl,
      // })
    })
  }

})
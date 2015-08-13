angular.module('ddysys.controllers')


//--------- 聊天controller ---------//
.controller('MessagesCtrl', function($scope, $ionicScrollDelegate, Messages, $stateParams, $localStorage, _, PostData, $http, $ionicModal) {

  $scope.user = $localStorage.getObject('user');
  $scope.toUser = _.findWhere($localStorage.getObject('patients'), {
    patId: Number($stateParams.patientId)
  });
  // $scope.toUser = $stateParams.patient
  $scope.input = {};

  function init() {
    Messages.all($stateParams.patientId).then(function(data) {
      if (!data) return;
      $scope.messages = _.sortBy(data.list, 'sentTime');

      //用underscore的map函数进行数据转换
      _.map($scope.messages, function(message) {
        if (message.msgType === 'P') {
          message.imageUrl = message.msgContent;
          message.msgContent = '<img width="100%" src="' + message.msgContent + '">';
        } else if (message.msgType === 'A') {
          message.audioUrl = message.msgContent;
          message.msgContent = message.msgSource === 'D' ? '<img src="img/chatto_voice_playing.png">' : '<img src="img/chat_voice_frame.png">';
        }
        console.log(message.msgContent)
      })

      $ionicScrollDelegate.scrollBottom();
    });
  }

  init();

  $scope.play = function(audioUrl) {
    var audio = new Audio(audioUrl);
    audio.play();
  }

  $ionicModal.fromTemplateUrl('app/templates/zoom_view.html', {
    scope: $scope,
    animation: "slide-in-up"
  }).then(function(modal) {
    $scope.zoomViewModal = modal;
  });

  $scope.showZoomView = function(imageUrl) {
    $scope.ngSrc = imageUrl;
    $scope.zoomViewModal.show();
  }

  $scope.closeZoomView = function() {
    $scope.zoomViewModal.hide();
  }

  $scope.$on('$destroy', function() {
    $scope.zoomViewModal.remove();
  });

  $scope.sendMessage = function() {
    var postData = new PostData('appsendmessage');
    postData.patId = $stateParams.patientId;
    postData.msgType = 'T';
    postData.msgContent = $scope.input.message;
    $http.post('api', postData).then(function(data) {
      if (!data) return;
      $scope.input.message = '';
      init();
    })
  }

})
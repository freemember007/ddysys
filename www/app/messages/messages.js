angular.module('ddysys.controllers')


//--------- 聊天controller ---------//
.controller('MessagesCtrl', function($scope, $ionicScrollDelegate, Messages, $stateParams, $localStorage, _, PostData, $http, $ionicModal, $imageHelper, $fileHelper, $cordovaMedia, $timeout) {

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

      // $ionicScrollDelegate.scrollBottom();
      $ionicScrollDelegate.$getByHandle('main').scrollBottom();
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

  $scope.uploadImage = function() {
    $imageHelper.choose(function(status) {
      $imageHelper.getImage(status, function(imageUrl) {
        alert(imageUrl)
        $fileHelper.upload(imageUrl, {
          service: 'appuploadimg',
          type: '6'
        }, function(res) {
          if (res && res.filePath) {
            $scope.sendMessage('P', res.filePath);
          }
        })
      })
    })
  }

  $scope.uploadAudio = function() {
    var src = 'beep.aac';
    var media = $cordovaMedia.newMedia(src);
    media.startRecord();
    function play(){
      media.stopRecord();
      alert(angular.toJson(media));
      // alert(media.src);
      media.setVolume(0.5);
      media.play();
      $fileHelper.upload(cordova.file.tempDirectory + 'beep.aac', {
        service: 'appuploadaudio',
        type: '11'
      }, function(res) {
        if (res && res.filePath) {
          $scope.sendMessage('A', res.filePath);
        }
      })
    }
    $timeout(play,1000);
  }

  $scope.sendMessage = function(type, content) {
    var postData = new PostData('appsendmessage');
    postData.patId = $stateParams.patientId;
    postData.msgType = type || 'T';
    postData.msgContent = content || $scope.input.message;
    $http.post('api', postData).then(function(data) {
      if (!data) return;
      $scope.input.message = '';
      init();
    })
  }

})
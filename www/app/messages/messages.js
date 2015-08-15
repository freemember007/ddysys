angular.module('ddysys.controllers')


//--------- 聊天controller ---------//
.controller('MessagesCtrl', function($scope, $ionicScrollDelegate, Messages, $stateParams, $localStorage, _, PostData, $http, $ionicModal, $imageHelper, $fileHelper, $cordovaMedia, $timeout, $interval, $cordovaToast) {

  $scope.user = $localStorage.getObject('user');
  $scope.toUser = _.findWhere($localStorage.getObject('patients'), {
    patId: Number($stateParams.patientId)
  });
  // $scope.toUser = $stateParams.patient
  $scope.input = {};
  $scope.input.audio = false;
  $scope.input.text = true;
  $scope.input.isRecording = false
  $scope.input.recordTime = "00:00";

  $scope.toggleInputStatus = function() {
    $scope.input.audio = !$scope.input.audio;
    $scope.input.text = !$scope.input.text;
  }

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
        // console.log(message.msgContent)
      })

      $timeout(scroll, 300)

      function scroll() {
        $ionicScrollDelegate.$getByHandle('main').scrollBottom();
      }

    });
  }

  init();

  // 放大图片
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

  //播放声音
  $scope.play = function(audioUrl) {
    // var audio = new Audio(audioUrl);
    // audio.play();
    var media = $cordovaMedia.newMedia(audioUrl);
    media.play();
  }


  // 发图片
  $scope.uploadImage = function() {
    $imageHelper.choose(function(status) {
      $imageHelper.getImage(status, function(imageUrl) {
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

  // 发语音
  var src = 'beep.aac';
  if (ionic.Platform.isIOS()) var media = $cordovaMedia.newMedia(src);

  var mm = 0;
  var ss = 0;
  var str = '';
  var t = null;
  var timer = function() {
    str = '';
    if (++ss == 60) {
      ++mm
      ss = 0;
    }
    str += mm < 10 ? '0' + mm : mm;
    str += ':';
    str += ss < 10 ? '0' + ss : ss;
    $scope.input.recordTime = str;
  }

  $scope.startRecord = function() {
    $scope.input.recordTime = "00:00";
    t = $interval(timer, 1000);
    $scope.input.isRecording = true;
    media.startRecord();
  }

  $scope.uploadAudio = function() {
    $interval.cancel(t); //清除定时器
    $scope.input.isRecording = false;
    $scope.input.recordTime = '00:00';
    var _ss = ss;
    mm = 0;
    ss = 0;
    media.stopRecord();
    if(_ss<2){
      $cordovaToast.showShortBottom('录音时间太短！');
      return;
    };
    $fileHelper.upload(cordova.file.tempDirectory + 'beep.aac', {
      service: 'appuploadaudio',
      type: '11'
    }, function(res) {
      if (res && res.filePath) {
        $scope.sendMessage('A', res.filePath);
        // media.release(); 
      }
    })
  }

  // 发文本
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
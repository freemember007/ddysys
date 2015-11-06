angular.module('ddysys.controllers')


//--------- 聊天controller ---------//
.controller('MessagesCtrl', function($scope, $ionicScrollDelegate, Messages, $stateParams, $localStorage, _, PostData, $http, $ionicModal, $imageHelper, $fileHelper, $cordovaMedia, $timeout, $interval, $system) {

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

  $scope.user = $localStorage.getObject('user');
  $scope.toUser = _.findWhere($localStorage.getObject('patients'), {
    patId: Number($stateParams.patientId)
  });
  $scope.input = {};
  $scope.input.message = $stateParams.msg || '';
  $scope.input.audioPanel = false;
  // $scope.input.textPanel = true;
  $scope.input.isRecording = false
  $scope.input.recordTime = "00:00";
  var page = 1;
  var messages = [];

  //加载消息
  function queryMsg(isFirst) {
    if(isFirst) page = 1;
    Messages.query($stateParams.patientId, page).then(function(data) {
      if (!data) return;
      var list = _.sortBy(data.list, 'sentTime');
      _.map(list, function(message) {
        if (message.msgType === 'P') {
          message.imageUrl = message.msgContent;
          message.msgContent = '<img width="100%" src="' + message.msgContent + '">';
        } else if (message.msgType === 'A') {
          message.audioUrl = message.msgContent;
          message.msgContent = message.msgSource === 'D' ? '<img src="img/chatto_voice_playing.png">' : '<img src="img/chat_voice_frame.png">';
        }
      })
      if(isFirst){
        messages = list;
        $timeout(scrollBottom, 300);
      }else{
        messages = list.concat(messages);
        $scope.$broadcast('scroll.refreshComplete');
      }
      $scope.messages = messages
      page ++;
    });
  }

  function scrollBottom() {
    $ionicScrollDelegate.$getByHandle('main').scrollBottom(true);
  }

  queryMsg(true);

  //加载消息历史
  $scope.loadMore = function(){
    queryMsg(false);
  }

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
    if (ionic.Platform.isWebView() && ionic.Platform.isIOS()) {
      var media = $cordovaMedia.newMedia(audioUrl);
      media.play();
    }else{
      var audio = new Audio(audioUrl);
      audio.play();
    }    
  }

  //切换输入状态
  $scope.toggleInputStatus = function() {
    $scope.input.audioPanel = !$scope.input.audioPanel;
    // $scope.input.textPanel = !$scope.input.textPanel;
  }

  // $window.addEventListener('native.keyboardshow', function(e){
  //   $ionicScrollDelegate.scrollBy(0,-e.keyboardHeight)
  // });

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
  if (ionic.Platform.isWebView() && ionic.Platform.isIOS()) var media = $cordovaMedia.newMedia(src);

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
      $system.toast('录音时间太短！');
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

  // 发消息
  $scope.sendMessage = function(type, content) {
    var postData = new PostData('appsendmessage');
    postData.patId = $stateParams.patientId;
    postData.msgType = type || 'T';
    postData.msgContent = content || $scope.input.message;
    $http.post('api', postData).then(function(data) {
      if (!data) return;
      $scope.input.message = '';
      queryMsg(true);
    })
  }

})
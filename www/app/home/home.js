angular.module('ddysys.controllers')


//--------- tab controller ---------//
.controller('tabCtrl', function($scope, $state, $rootScope, $localStorage, badge) {

  $scope.settings = {
    isTab1: true,
  }

  badge.get();

  $scope.active = function(tab) {
    $scope.settings = {
      isTab1: false,
      isTab2: false,
      isTab3: false,
      isTab4: false
    }
    $scope.settings[tab] = true;
  }

})


//--------- 首页 controller ---------//
.controller('HomeCtrl', function($scope, $localStorage, PostData, $http, pushService, badge) {

  $scope.$on( "$ionicView.enter", function(){
    $scope.active('isTab1');
  })

  // 注册推送
  if (ionic.Platform.isIOS()) {
    pushService.register();
  }

  $scope.user = $localStorage.getObject('user');
  var postData = new PostData('appindex');

  $http.post('api', postData).then(function(data) {
    if (!data) return;
    $scope.docSchedules = data.dsList.slice(0, 2);
    $scope.userMessages = data.umList;
    _.map($scope.userMessages, function(item){
      if(item.msgType === 'P'){
        item.msgContent = '[图片]';
      }else if(item.msgType === 'A'){
        item.msgContent = '[语音]';
      }
      // console.log(item.msgContent)
    })
    var allUnreadCount = 0;
    _.each(data.umList, function(element){
      allUnreadCount += element.unreadCount;
    });
    badge.set('home', allUnreadCount);
  })

})
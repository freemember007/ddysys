angular.module('ddysys.services')


//--------- 本地存储 ---------//
.factory('pushService', ['$http', '$rootScope', '$state', '$cordovaPush', 'PostData', 'badge', function($http, $rootScope, $state, $cordovaPush, PostData, badge) {
  return {
    register: function() {
      var iosConfig = {
        'badge': true,
        'sound': true,
        'alert': true,
      };
      $cordovaPush.register(iosConfig).then(function(result) {
        console.log('result: ' + result)
        $rootScope.deviceToken = result;
        var postData = new PostData('appupdatepushid');
        postData.pushId = result;
        $http.post('api', postData).then(function(data){
          if(data) alert('推送ID已成功保存至服务器');
        })
      }, function(err) {
        alert('Registration error: ' + err)
      });

      // 推送回调
      $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
        if (notification.foreground == "0") { //背景
          switch(notification.type){
            case 'B1':
              $state.go('messages', { patientId: notification.patId });
              break;
            default:
              $state.go('tab.patients')
          }
        } else { //前景
          switch(notification.type){
            case 'B1':
              badge.plus('home');
              break;
            default:
              badge.plus('patients');
          }
        }
      });
    },
    unregister: function() {
      $cordovaPush.unregister().then(function(result) {
        // Success!
      }, function(err) {
        // Error
      })
    }
  }
}])
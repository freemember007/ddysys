angular.module('ddysys.services')


//--------- 本地存储 ---------//
.factory('pushService', ['$http', '$rootScope', '$state', '$cordovaPush', 'PostData', function($http, $rootScope, $state, $cordovaPush, PostData) {
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
          if(data) console.log('推送ID已成功保存至服务器');
        })
      }, function(err) {
        alert('Registration error: ' + err)
      });

      // 推送回调
      $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
        if (notification.foreground == "0") { //背景
          $state.go('tab.patients')
        } else { //前景
          alert(angular.toJson(notification) + '|' + angular.toJson(event));
        }
        if (notification.badge) {
          $cordovaPush.setBadgeNumber(notification.badge);
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
angular.module('ddysys.services')


//--------- 本地存储 ---------//
.factory('pushService', ['$http', '$rootScope', '$state', '$cordovaPush', function($http, $rootScope, $state, $cordovaPush) {
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
        //$http.post('http://server.co/', {user: 'Bob', tokenID: result.deviceToken})
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
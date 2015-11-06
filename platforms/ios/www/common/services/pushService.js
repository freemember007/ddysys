angular.module('ddysys.services')


//--------- 本地存储 ---------//
.factory('pushService', function($http, $rootScope, $state, $cordovaPush, PostData, badge, $system) {
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
        $system.toast('Registration error: ' + err)
      });

      // 推送回调
      $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
        if (notification.foreground == "0") { //背景
          switch(notification.type){
            case 'B1': //消息
              $state.go('messages', { patientId: notification.patId });
              break;
            case 'A1': //患者请求
              badge.plus('patients');
              $state.go('patients_requests');
              break;
            case 'B4'://咨询
              $state.go('consults_detail', {consultId:notification.consultId});
              break;
            case 'A3'://加号
              $state.go('tab.home');
              break;
            default:
              $state.go('tab.home')
          }
        } else { //前景
          // alert(angular.toJson(notification));
          switch(notification.type){
            case 'B1':
              badge.plus('home');
              $rootScope.initHome();
              break;
            case 'A1':
              badge.plus('patients');
              break;
            case 'B4':
              break;
            case 'A3':
              break;
            default:
              break;
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
})
angular.module('ddysys.services')

.factory('Interceptor', function($rootScope, $location, $cordovaToast, $cordovaDialogs) {

    var apiUrl = 'http://192.168.1.22:8004/app';

    return {

      'request': function(config) {
        if (config.url === 'api') {
          $rootScope.$broadcast('loading:show');
          config.url = apiUrl;
          console.log(config.url);
        }
        return config;
      },

      'requestError': function(rejection) {
        $rootScope.$broadcast('loading:hide');
        alert('请求错误：' + rejection); 
      },

      'response': function(res) {
        $rootScope.$broadcast('loading:hide');
        var data = res.data;
        if (res.config.url === apiUrl) {
          console.log(data);
          if (angular.isObject(data) && data.code && !data.succ) {
            alert(data.msg + '(' + data.code +')'); //处理接口错误
            $cordovaToast.showShortBottom(data.msg + '(' + data.code +')'); //处理接口错误
          } else { 
            return data; //处理接口正常返回
          }
        } else {
          return res //处理其他正常返回
        }
        
      },

      'responseError': function(res) { //处理HTTP错误
        $rootScope.$broadcast('loading:hide');
        var status = res.status;
        if (status === 0 ) {
          alert('网络异常、超时或不支持跨域请求！');
          $cordovaDialogs.alert('网络异常、超时或不支持跨域请求！', '提示', '确定')
        } else if (status === 404) {
          alert('请求的资源不存在！');
          $location.path('/notFound')
        } else if (status === 500) {
          alert('服务器内部错误！');
          $location.path('/error')
        } else {
          alert('HTTP错误：' + status);
        }
      }
    };
});
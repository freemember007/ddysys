angular.module('ddysys.services')

.factory('PostData', function($localStorage){
  var PostData = function(service) {
    this.spid = '9920';
    this.channel = '1';
    this.random = '1234';
    this.sign = 'c559573c2589f78d376da8476edf946a';
    this.format = 'JSON';
    this.oper = '127.0.0.1';
    this.token = $localStorage.get('token');
    this.service = service;
  };
  return PostData;
})

.factory('Token', function($localStorage){
  return {
    get: function(){
      return $localStorage.get('token')
    },
    save: function(value){
      $localStorage.save('token', value)
    },
    remove: (function(){
      $localStorage.remove('token')
    })
  }
})

.factory('LocalUser', function($localStorage){
  return {
    get: function(){
      return $localStorage.get('user')
    },
    save: function(value){
      $localStorage.save('user', value)
    },
    remove: (function(){
      $localStorage.remove('user')
    })
  }
})

.factory('Interceptor', function($rootScope, $location, $system, apiUrl, $system) {

    return {

      'request': function(config) {
        if (config.url === 'api') {
          $rootScope.$broadcast('loading:show');
          // NProgress.start();
          config.url = apiUrl;
          // console.log(config.data);
        }
        return config;
      },

      'requestError': function(rejection) {
        $rootScope.$broadcast('loading:hide');
        // NProgress.done();
        $system.alert('请求错误：' + rejection); 
      },

      'response': function(res) {
        $rootScope.$broadcast('loading:hide');
        // NProgress.done();
        var data = res.data;
        if (res.config.url === apiUrl) {
          // console.log(data);
          if (angular.isObject(data) && data.code && !data.succ) {
            $system.alert(data.msg + '（错误代码：' + data.code +'）'); //处理接口错误
            if(data.code === '00000010') $location.path('/login');
          } else { 
            return data; //处理接口正常返回
          }
        } else {
          return res //处理其他正常返回
        }
        
      },

      'responseError': function(res) { //处理HTTP错误
        $rootScope.$broadcast('loading:hide');
        // NProgress.done();
        var status = res.status;
        if (status === 0 ) {
          $system.alert('网络异常！请检查您的网络连接！');
        } else if (status === 404) {
          $system.alert('请求的资源不存在！');
          $location.path('/notFound')
        } else if (status === 500) {
          $system.alert('服务器内部错误！');
          $location.path('/error')
        } else {
          $system.alert('HTTP错误：' + status);
        }
      }
    };
});
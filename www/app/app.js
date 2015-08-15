angular.module('ddysys', ['ionic', 'ngCordova', 'ddysys.services', 'ddysys.controllers', 'underscore'])


//--------- 运行 ---------//
.run(function($ionicPlatform, $rootScope, $ionicLoading, $state, $localStorage) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // cordova.plugins.Keyboard.disableScroll(true);
    }

    // if ('addEventListener' in document) {
    //   document.addEventListener('DOMContentLoaded', function() {
    //     alert(FastClick)
    //     FastClick.attach(document.body);
    //   }, false);
    // }

    // 状态bar风格
    if (window.StatusBar) {
      // cordova-plugin-statusba required
      StatusBar.styleLightContent();
    }

    // 全局loading
    $rootScope.$on('loading:show', function() {
      $ionicLoading.show({
        template: '请稍等...'
      })
    })
    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide()
    })

    // 登录状态判断
    if ($localStorage.get('token')) {
      $state.go('tab.home');
    } else {
      $state.go('login');
    };

  });
})


//--------- 配置 ---------//
.config(function($provide, $stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

  // 定义常量
  // $provide.constant('apiUrl', 'http://192.168.1.12:8004/app');
  // $provide.constant('apiUrl', 'http://192.168.0.140:8080/gh_ws_webfep/app');
  $provide.constant('apiUrl', 'http://teyangnet.eicp.net:8004/app');

  // 允许CORS请求
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // http拦截器
  $httpProvider.interceptors.push('Interceptor');

  // http请求体变换
  // var baseParams = {
  //     spid: '9901',
  //     channel: '1',
  //     random: '1234',
  //     sign: '3120e0d0313ddc4e9aceb818be24c03b',
  //     format: 'JSON',
  //     oper: '127.0.0.1'
  //   };
  // $httpProvider.defaults.transformRequest.push(function(data){
  //   if(data && data.indexOf('"service":') !== -1){
  //     console.log(data)
  //     data = angular.fromJson(data);
  //     angular.extend(data, baseParams);
  //     data = angular.toJson(data);
  //     console.log(data)
  //   }
  //   return data;
  // });

  //使用原生滚动
  // $ionicConfigProvider.scrolling.jsScrolling(false); 

  //tab与nav风格
  // $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
  // $ionicConfigProvider.tabs.style('standard');

  $stateProvider

  // tab组
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'app/home/tabs.html',
    controller: 'tabCtrl'
  })


  // 首页
  .state('tab.home', {
    url: '/home',
    templateUrl: 'app/home/home.html',
    controller: 'HomeCtrl'
  })


  // 日程
  .state('events', {
      url: '/events/:patientId',
      templateUrl: 'app/events/events.html',
      controller: 'EventsCtrl'
    })
    .state('events_detail', {
      url: '/events/:eventId',
      templateUrl: 'app/events/events_detail.html',
      controller: 'EventsDetailCtrl',
      params: {
        event: null
      }
    })


  // 患者
  .state('tab.patients', {
    url: '/patients',
    templateUrl: 'app/patients/patients.html',
    controller: 'PatientsCtrl',
    // resolve: {
    //   patients: function(Patients){ //这样貌似很不健壮，如果Patients服务出问题，不会报错。
    //     return Patients.all()
    //   }
    // }
  })

  .state('patients_requests', {
    cache: false,
    url: '/patients/requests',
    templateUrl: 'app/patients/patients_requests.html',
    controller: 'PatientsRequestsCtrl'
  })

  .state('patients_requests_detail', {
    url: '/patients/requests/:patientId',
    templateUrl: 'app/patients/patients_requests_detail.html',
    controller: 'PatientsRequestsDetailCtrl'
  })

  .state('patients_detail', {
    url: '/patients/:patientId',
    templateUrl: 'app/patients/patients_detail.html',
    controller: 'PatientsDetailCtrl'
  })

  .state('patients_events', {
    url: '/events',
    templateUrl: 'app/events/events.html',
    // controller: 'PatientsChatCtrl',
  })

  // 消息
  .state('messages', {
    url: '/messages/:patientId',
    templateUrl: 'app/messages/messages.html',
    controller: 'MessagesCtrl',
    // params: {
    //   patient: null
    // }
  })

  // 咨询
  .state('tab.consults', {
    url: '/consults',
    templateUrl: 'app/consults/consults.html',
    controller: 'ConsultsCtrl',
    // resolve: {
    //   consults: function(Consults){
    //     return Consults.all()
    //   }
    // }
  })

  .state('consults_detail', {
    url: '/consults/:consultId',
    templateUrl: 'app/consults/consults_detail.html',
    controller: 'ConsultsDetailCtrl',
    // resolve: {
    //   consult: function(Consults, $stateParams){
    //     return Consults.get($stateParams.consultId)
    //   }
    // }
  })


  // 我
  .state('tab.account', {
    url: '/account',
    templateUrl: 'app/account/account.html',
    controller: 'AccountCtrl'
  })

  .state('account_rate', {
    url: '/account/rate',
    templateUrl: 'app/account/account_rate.html',
    controller: 'AccountRateCtrl'
  })

  .state('account_barcode', {
    url: '/account/barcode',
    templateUrl: 'app/account/account_barcode.html',
    controller: 'AccountBarcodeCtrl'
  })

  .state('account_timetable', {
    url: '/account/timetable',
    templateUrl: 'app/account/account_timetable.html',
    controller: 'AccountTimetableCtrl'
  })

  .state('account_info', {
    url: '/account/info',
    templateUrl: 'app/account/account_info.html',
    controller: 'AccountInfoCtrl'
  })

  .state('account_set', {
    url: '/account/set',
    templateUrl: 'app/account/account_set.html',
    controller: 'AccountSetCtrl'
  })

  .state('account_modpwd', {
    url: '/account_modpwd',
    templateUrl: 'app/account/account_modpwd.html',
    controller: 'AccountModpwdCtrl'
  })


  // 登录、注册、重置密码
  .state('login', {
    url: '/login',
    templateUrl: 'app/login/login.html',
    controller: 'LoginCtrl'
  })

  .state('register_verify', {
    url: '/register_verify',
    templateUrl: 'app/register/register_verify.html',
    controller: 'RegisterVerifyCtrl'
  })

  .state('register_agreement', {
    url: '/register_agreement',
    templateUrl: 'app/register/register_agreement.html',
  })

  .state('register', {
    url: '/register',
    templateUrl: 'app/register/register.html',
    controller: 'RegisterCtrl'
  })

  .state('register_upload', {
    url: '/register_upload',
    templateUrl: 'app/register/register_upload.html',
    controller: 'RegisterUploadCtrl'
  })

  .state('register_waiting', {
    url: '/register_waiting',
    templateUrl: 'app/register/register_waiting.html',
    controller: 'RegisterWaitingCtrl'
  })

  .state('reset_passwd_verify', {
    url: '/reset_passwd_verify',
    templateUrl: 'app/reset_passwd/reset_passwd_verify.html',
    controller: 'ResetPasswdVerifyCtrl'
  })

  .state('reset_passwd', {
    url: '/reset_passwd',
    templateUrl: 'app/reset_passwd/reset_passwd.html',
    controller: 'ResetPasswdCtrl'
  })

  // $urlRouterProvider.otherwise('/login'); //这个会导致在iOS上每次打开软件时首先进入登录页

});


//--------- 模块宣扬及依存 ---------//
angular.module('ddysys.services', []);
angular.module('ddysys.filters', []);
angular.module('ddysys.directives', []);
angular.module('ddysys.controllers', ['ddysys.services', 'ddysys.directives', 'ddysys.filters']);
angular.module('underscore', [])
  .factory('_', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
  });

//--------- 全局函数 ---------//
// onerror
function onProfilePicError(ele) {
  ele.src = 'img/default_nomale_head_photo.png'
}
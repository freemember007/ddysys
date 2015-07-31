angular.module('ddysys', ['ionic', 'ngCordova', 'ddysys.services', 'ddysys.controllers', 'underscore']) 


//--------- 运行 ---------//
.run(function($ionicPlatform, $rootScope, $ionicLoading, $state, $localStorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // cordova-plugin-statusba required
      StatusBar.styleLightContent();
    }

    $rootScope.$on('loading:show', function() {
      $ionicLoading.show({template: '请稍等...'})
    })

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide()
    })


    // 登录状态判断
    if($localStorage.get('token')){
      $state.go('tab.home');
    } else {
      $state.go('login');
    };

  });
})


//--------- 配置 ---------//
.config(function($provide, $stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

  // 允许cors请求
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // 请求拦截器
  $httpProvider.interceptors.push('Interceptor');
  var baseParams = {
      spid: '9901',
      channel: '1',
      random: '1234',
      sign: '3120e0d0313ddc4e9aceb818be24c03b',
      format: 'JSON',
      oper: '127.0.0.1'
    };
  $httpProvider.defaults.transformRequest.push(function(data){
    if(data && data.indexOf('"service":') !== -1){
      console.log(data)
      data = angular.fromJson(data);
      angular.extend(data, baseParams);
      data = angular.toJson(data);
      console.log(data)
    }
    return data;
  });

  //使用原生滚动
  // $ionicConfigProvider.scrolling.jsScrolling(false); 

  //tab与nav风格
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.tabs.style('standard');

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
    views: {
      'home': {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.home_barcode', {
    url: '/barcode',
    views: {
      'home': {
        templateUrl: 'app/account/account_barcode.html',
        controller: 'AccountBarcodeCtrl'
      }
    }
  })

  .state('tab.home_chat', {
    url: '/chat',
    views: {
      'home': {
        templateUrl: 'app/patients/patients_chat.html',
        controller: 'PatientsChatCtrl',
      }
    }
  })


  // 日程
  .state('tab.events', {
    url: '/events',
    views: {
      'home': {
        templateUrl: 'app/events/events.html',
        controller: 'EventsCtrl',
      }
    }
  })
  .state('tab.events_detail', {
    url: '/events/:eventId',
    views: {
      'home': {
        templateUrl: 'app/events/events_detail.html',
        controller: 'EventsDetailCtrl'
      }
    },
    params: {event: null}
  })


  // 患者管理
  .state('tab.patients', {
    url: '/patients',
    views: {
      'patients': {
        templateUrl: 'app/patients/patients.html',
        controller: 'PatientsCtrl',
        // resolve: {
        //   patients: function(Patients){ //这样貌似很不健壮，如果Patients服务出问题，不会报错。
        //     return Patients.all()
        //   }
        // }
      }
    }
  })

  .state('tab.patients_chat', {
    url: '/chat',
    views: {
      'patients': {
        templateUrl: 'app/patients/patients_chat.html',
        controller: 'PatientsChatCtrl',
      }
    }
  })

  // 咨询
  .state('tab.consults', {
      url: '/consults',
      views: {
        'consults': {
          templateUrl: 'app/consults/consults.html',
          controller: 'ConsultsCtrl',
          resolve: {
            consults: function(Consults){
              return Consults.all()
            }
          }
        }
      }
    })
    .state('tab.consults_detail', {
      url: '/consults/:consultId',
      views: {
        'consults': {
          templateUrl: 'app/consults/consults_detail.html',
          controller: 'ConsultsDetailCtrl',
          resolve: {
            consult: function(Consults, $stateParams){
              return Consults.get($stateParams.consultId)
            }
          }
        }
      }
    })


  // 个人中心
  .state('tab.account', {
    url: '/account',
    views: {
      'account': {
        templateUrl: 'app/account/account.html',
        controller: 'AccountCtrl'
      }
    }
  })

    .state('tab.account_rate', {
      url: '/account_rate',
      views: {
        'account': {
          templateUrl: 'app/account/account_rate.html',
          controller: 'AccountRateCtrl'
        }
      }
    })

    .state('tab.account_barcode', {
      url: '/account_barcode',
      views: {
        'account': {
          templateUrl: 'app/account/account_barcode.html',
          controller: 'AccountBarcodeCtrl'
        }
      }
    })

    .state('tab.account_timetable', {
      url: '/account_timetable',
      views: {
        'account': {
          templateUrl: 'app/account/account_timetable.html',
          controller: 'AccountTimetableCtrl'
        }
      }
    })

    .state('tab.account_info', {
      url: '/account_info',
      views: {
        'account': {
          templateUrl: 'app/account/account_info.html',
          controller: 'AccountInfoCtrl'
        }
      }
    })

    .state('tab.account_set', {
      url: '/account_set',
      views: {
        'account': {
          templateUrl: 'app/account/account_set.html',
          controller: 'AccountSetCtrl'
        }
      }
    })

    .state('tab.account_modpwd', {
      url: '/account_modpwd',
      views: {
        'account': {
          templateUrl: 'app/account/account_modpwd.html',
          controller: 'AccountModpwdCtrl'
        }
      }
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

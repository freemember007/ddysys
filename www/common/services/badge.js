angular.module('ddysys.services')

.factory('badge', function($rootScope, $localStorage, $cordovaPush) {

  return {
    get: function(type, number) {
      $rootScope.badge = {};
      $rootScope.badge.home = Number($localStorage.get('badge-home')) || 0;
      $rootScope.badge.patients = Number($localStorage.get('badge-patients')) || 0;
    },
    set: function(type, number) {
      $rootScope.badge[type] = number;
      $localStorage.set('badge-' + type, $rootScope.badge[type]);
      if (ionic.Platform.isIOS()) $cordovaPush.setBadgeNumber($rootScope.badge.home + $rootScope.badge.patients);
    },
    plus: function(type, number) {
      $rootScope.badge[type] += 1;
      $localStorage.set('badge-' + type, $rootScope.badge[type]);
      if (ionic.Platform.isIOS()) $cordovaPush.setBadgeNumber($rootScope.badge.home + $rootScope.badge.patients);
    },
    minus: function(id) {
      $rootScope.badge[type] -= 1;
      $localStorage.set('badge-' + type, $rootScope.badge[type]);
      if (ionic.Platform.isIOS()) $cordovaPush.setBadgeNumber($rootScope.badge.home + $rootScope.badge.patients);
    }

  }

})
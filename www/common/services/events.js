angular.module('ddysys.services')

.factory('Events', function($localStorage, $http) {

  var postData = {
    token: $localStorage.get('token')
  }

  return {
    all: function() {
      postData.service = 'appdocschedulelist';
      return $http.post('api', postData);
    },
    get: function(id) {
      postData.service = 'appconsultinfo';
      postData.consultId = id;
      return $http.post('api', postData);
    },
  }

})
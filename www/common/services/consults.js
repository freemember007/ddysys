angular.module('ddysys.services')

.factory('Consults', function($localStorage, $http) {

  var postData = {
    service: 'appconsultlist',
    token: $localStorage.get('token')
  }

  return {
    all: function() {
      return $http.post('api', postData);
    },
  }

})
angular.module('ddysys.services')

.factory('Consults', function($localStorage, $http) {

  var postData = {
    token: $localStorage.get('token')
  }

  return {
    all: function() {
      postData.service = 'appconsultlist';
      return $http.post('api', postData);
    },
    get: function(id) {
      postData.service = 'appconsultinfo';
      postData.consultId = id;
      return $http.post('api', postData);
    },
  }

})
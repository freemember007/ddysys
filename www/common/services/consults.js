angular.module('ddysys.services')

.factory('Consults', function($localStorage, $http) {

  var postData = {
    token: $localStorage.get('token')
  }

  return {
    all: function(type) {
      postData.service = 'appconsultlist';
      postData.type = type;
      return $http.post('api', postData);
    },
    get: function(id) {
      postData.service = 'appconsultinfo';
      postData.consultId = id;
      return $http.post('api', postData);
    }
  }

})
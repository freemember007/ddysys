angular.module('ddysys.services')

.factory('Patients', function($q, $http, $localStorage) {

  var postData = {
    service: 'appalldocpatientlist',
    token: $localStorage.get('token')
  }

  return {
    all: function() {
      return $http.post('api', postData)
    },
  };
})
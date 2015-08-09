angular.module('ddysys.services')

.factory('Events', function(PostData, $http) {

  return {
    all: function(patientId) {
      var postData = new PostData('appdocschedulelist');
      postData.patId = patientId || null;
      return $http.post('api', postData);
    },
    get: function(eventId) {
      var postData = new PostData('');
      postData.eventId = eventId;
      return $http.post('api', postData);
    },
  }

})
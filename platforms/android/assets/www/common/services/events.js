angular.module('ddysys.services')

.factory('Events', function(PostData, $http) {

  return {
    all: function(patientId) {
      var postData = new PostData('appdocschedulelist');
      postData.patId = patientId;
      postData.limit = 20;
      return $http.post('api', postData);
    },
    get: function(eventId) {
      var postData = new PostData('');
      postData.eventId = eventId;
      return $http.post('api', postData);
    },
    add: function(patientId, appendData){
      var postData = new PostData('appadddocschedule');
      postData.patId = patientId;
      angular.extend(postData, appendData);
      return $http.post('api', postData);
    }
  }

})
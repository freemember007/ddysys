angular.module('ddysys.services')

.factory('Messages', function(PostData, $http) {

  return {
    all: function(patientId) {
      var postData = new PostData('appmessagelist');
      postData.patId = patientId;
      return $http.post('api', postData);
    },
    reply: function(patientId, msgType, msgContent){
      var postData = new PostData('appsendmessage');
      postData.patId = patientId;
      postData.msgType = msgType;
      postData.msgContent = msgContent;
      return $http.post('api', postData);
    }

  }

})
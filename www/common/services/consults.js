angular.module('ddysys.services')

.factory('Consults', function($http, PostData) {

  return {
    all: function(type) {
      var postData = new PostData('appconsultlist');
      postData.type = type;
      return $http.post('api', postData);
    },
    get: function(id) {
      var postData = new PostData('appconsultinfo');
      postData.consultId = id;
      return $http.post('api', postData);
    },
    reply: function(id, content){
      var postData = new PostData('appconsultreplysave');
      postData.consultId = id;
      postData.replyContent = content;
      return $http.post('api', postData);
    }

  }

})
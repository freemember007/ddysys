angular.module('ddysys.services')

.factory('Consults', function(PostData, $http) {

  return {
    all: function(type) {
      var postData = new PostData('appconsultlist');
      postData.limit = 30; //后续可能要加分页
      postData.type = type;
      return $http.post('api', postData);
    },
    get: function(id) {
      var postData = new PostData('appconsultinfo');
      postData.consultId = id;
      postData.limit = 30;
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
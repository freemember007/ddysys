angular.module('ddysys.services')

.factory('Consults', function(PostData, $http) {

  return {
    all: function(type) {
      var postData = new PostData('appconsultlist');
      // PostData.service = 'appconsultlist';
      // console.log('PostData1: ' + angular.toJson(postData));
      postData.type = type;
      return $http.post('api', postData);
    },
    get: function(id) {
      var postData = new PostData('appconsultinfo');
      // PostData.service = 'appconsultinfo';
      // console.log('PostData2: ' + angular.toJson(postData));
      postData.consultId = id;
      return $http.post('api', postData);
    },
    reply: function(id, content){
      var postData = new PostData('appconsultreplysave');
      // PostData.service = 'appconsultlist';
      // console.log('PostData3: ' + angular.toJson(postData));
      postData.consultId = id;
      postData.replyContent = content;
      return $http.post('api', postData);
    }

  }

})
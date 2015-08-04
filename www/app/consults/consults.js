angular.module('ddysys.controllers')


//--------- 咨询列表controller ---------//
.controller('ConsultsCtrl', function($scope, $http, $localStorage) {

  $scope.setType = function(type) {
    $scope.type = type;
    var postData = {
      token: $localStorage.get('token'),
      service: 'appconsultlist',
      type: type
    }
    $http.post('api', postData).then(
      function(data) {
        if (data) {
          $scope.consults = data.list;
        }
      }
    );
  }

  $scope.setType('DS');

})


//--------- 咨询详情controller ---------//
.controller('ConsultsDetailCtrl', function($scope, $http, $localStorage, consult) {

  $scope.reply = {};
  $scope.user = $localStorage.getObject('user');
  $scope.consult = consult.userConsultForm;
  $scope.replies = consult.list;
  $scope.doReply = function() {
    var postData = {
      service: 'appconsultreplysave',
      token: $localStorage.get('token')
    }
    postData.consultId = $scope.consult.consultId;
    postData.replyContent = $scope.reply.content;
    $http.post('api', postData).then(
      function(data) {
        if (data) {
          // $scope.consult = data.userConsultForm; //接口没有传加userConsultForm对象
          $scope.replies.unshift({
            replyContent: $scope.reply.content,
            replyName: $scope.user.dName,
            replyTime: new Date(),
            replyFaceUrl: $scope.user.dFaceUrl,
          })
          $scope.reply.content = ''
        }
      }
    )
  }
})
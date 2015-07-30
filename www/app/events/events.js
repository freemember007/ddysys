angular.module('ddysys.controllers')


//--------- 日程列表页 controller ---------//
.controller('EventsCtrl', function($scope, $http, $localStorage, _, $filter) {

  var postData = {
    service: 'appdocschedulelist', 
    token: $localStorage.get('token')
  }
  $http.post('api', postData).then(
    function(data){
    if(data){
      eventsGroup = _.groupBy(data.list, function(item){
        return $filter('date')(item.scheduleTime, 'yyyy年MM月dd日')
      });
      $scope.eventsGroup = _.pairs(eventsGroup)
    }
  })

})


//--------- 日程详情页 controller ---------//
.controller('EventsDetailCtrl', function($scope, $stateParams, $http, $localStorage) {

  $scope.event = $stateParams.event

})
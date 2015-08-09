angular.module('ddysys.controllers')


//--------- 日程列表页 controller ---------//
.controller('EventsCtrl', function($scope, $stateParams, Events,  _, $filter) {

  Events.all($stateParams.patientId).then(function(data){
    if(!data)return;
    eventsGroup = _.groupBy(data.list, function(item){
      return $filter('date')(item.scheduleTime, 'yyyy年MM月dd日')
    });
    $scope.eventsGroup = _.pairs(eventsGroup)
  })

})


//--------- 日程详情页 controller ---------//
.controller('EventsDetailCtrl', function($scope, $stateParams) {

  $scope.event = $stateParams.event

})
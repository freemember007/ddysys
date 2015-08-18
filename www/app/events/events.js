angular.module('ddysys.controllers')


//--------- 日程列表页 controller ---------//
.controller('EventsCtrl', function($scope, $stateParams, Events,  _, $filter) {

  $scope.patientId = $stateParams.patientId;

  Events.all($stateParams.patientId).then(function(data){
    if(!data)return;
    eventsGroup = _.groupBy(data.list, function(item){
      return $filter('date')(item.scheduleTime, 'yyyy年MM月dd日')
    });
    $scope.eventsGroup = _.pairs(eventsGroup)
  })

})


//--------- 日程详情页 controller ---------//
.controller('EventsDetailCtrl', function($scope, $state, $stateParams, $filter) {

  $scope.event = $stateParams.event;

  var msg = $scope.event.patName + '，你好，别忘了' + $filter('date')($scope.event.scheduleTime, 'MM月dd日hh:mm') + $scope.event.schContent

  $scope.sendEvent = function(){
    $state.go('messages', {msg:msg, patientId: $scope.event.patId})
  }

})


//--------- 添加日程 controller ---------//
.controller('AddEventCtrl', function($scope, $localStorage, $ionicHistory, $stateParams, $filter, Events, $system) {

  $scope.patientId = $stateParams.patientId;

  $scope.event = {};
  var patient = _.findWhere($localStorage.getObject('patients'), {
    patId: Number($stateParams.patientId)
  });
  $scope.event.hzxm = patient.hzxm;
  $scope.event.mentionDoc = true;
  $scope.event.mentionPat = true;

  $scope.sendEvent = function(){
    $scope.event.scheduleTime = $filter('date')($scope.event.date, 'yyyy-MM-dd') + $filter('date')($scope.event.time, ' hh:mm:ss');
    $scope.event.pushDoc = $scope.event.mentionDoc === true ? 0 : 1;
    $scope.event.pushPat = $scope.event.mentionPat === true ? 0 : 1;
    Events.add($scope.patientId, $scope.event).then(function(data){
      if(!data)return;
      $system.toast('日程添加成功！');
      $ionicHistory.goBack();
    })
  }

})
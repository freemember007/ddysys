angular.module('ddysys.controllers')

.controller('NewsCtrl', function($scope, News, $ionicListDelegate, $timeout) {

  $scope.news = [];

  $scope.doRefresh = function() {
    var promise = News.all(0);
    promise.then(function(data) {
      $scope.news = data;
      // console.log($scope.news[0])
      $scope.$broadcast('scroll.refreshComplete');
      News.param.skip = 15; //复位
      News.param.hasmore = true; //同上
    }, function(data) { 
      alert("查询失败: " + data);
    });
  }

  $scope.doRefresh();
  News.param.hasmore = true;
  $scope.loadMore = function() {
    $timeout(function() {
      if (!News.param.hasmore) {
        $scope.$broadcast('scroll.infiniteScrollComplete');
        return;
      }
    }, 1000);
    var promise = News.all(News.param.skip);
    promise.then(function(data) {
      $scope.news = $scope.news.concat(data);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      News.param.skip += 15;
      News.count().then(function(data){
        if(News.param.skip >= data) {
          News.param.hasmore = false;
        }
      })
    }, function(data) {
      alert("查询失败: " + data);
    });
  }

  $scope.moreDataCanBeLoaded = function() {
    return News.param.hasmore;
  }

  $ionicListDelegate.showReorder(true);

})


.controller('NewsDetailCtrl', function($scope, $ionicLoading, $stateParams, $sce) {
  
  $scope.title = $stateParams.title;
  // console.log($scope.title)

  $ionicLoading.show({
    template: '加载中...'
  });

  // var id = "09774f6c35";
  var id = $stateParams.newsId;

  Bmob.Cloud.run('fetchContent', {
    "objectId": id
  }, {
    success: function(result) {
      $scope.content = $sce.trustAsHtml(result);
      $ionicLoading.hide()
    },
    error: function(error) {
      alert(error);
      $ionicLoading.hide()
    }
  })
});
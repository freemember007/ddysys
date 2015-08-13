angular.module('ddysys.directives')

.directive('focus', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $timeout(function() {
        element[0].focus();
      }, 500);
    }
  }
})

// .directive('hideTabs', function($rootScope) {
//   return {
//     restrict: 'A',
//     link: function($scope, $el) {
//       $rootScope.hideTabs = true;
//       $scope.$on('$destroy', function() {
//         $rootScope.hideTabs = false;
//       });
//     }
//   };
// })

// 校验密码重复
.directive("repeatPassword", function() {
  return {
    require: "ngModel",
    link: function(scope, elem, attrs, ctrl) {
      var otherInput = elem.inheritedData("$formController")[attrs.repeatPassword];

      ctrl.$parsers.push(function(value) {
        if (value === otherInput.$viewValue) {
          ctrl.$setValidity("repeat", true);
          return value;
        }
        ctrl.$setValidity("repeat", false);
      });

      otherInput.$parsers.push(function(value) {
        ctrl.$setValidity("repeat", value === ctrl.$viewValue);
        return value;
      });
    }
  };
})


.directive("zoomView", function($compile, $ionicModal) {

  return {

    restrict: "A",

    link: function link(scope, elem, attr) {

      elem.attr("ng-click", "showZoomView()");
      elem.removeAttr("zoom-view");
      $compile(elem)(scope);

      $ionicModal.fromTemplateUrl('app/templates/zoom_view.html', {
        scope: scope,
        animation: "slide-in-up"
      }).then(function(modal){
        scope.zoomViewModal = modal;
      });

      scope.showZoomView = function() {
        scope.zoomViewModal.show();
        scope.ngSrc = attr.ngSrc;
      };

      scope.closeZoomView = function() {
        scope.zoomViewModal.hide();
      };
    }
  };
})
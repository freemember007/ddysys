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
      }).then(function(modal) {
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

// 'use strict';

// .directive('onLongPress', ['$timeout', '$swipe', function($timeout, $swipe) {
//   return {
//     restrict: 'A',
//     link: function($scope, $elm, $attrs) {

//       $swipe.bind($elm, {
//         'start': function(coords) {
//           // Locally scoped variable that will keep track of the long press
//           $scope.longPress = true;

//           // We'll set a timeout for 600 ms for a long press
//           $timeout(function() {
//             if ($scope.longPress) {
//               // If the touchend event hasn't fired,
//               // apply the function given in on the element's on-long-press attribute
//               $scope.$apply(function() {
//                 $scope.$eval($attrs.onLongPress)
//               });
//             }
//           }, 600);
//         },
//         'move': function(coords) {},
//         'end': function(coords) {
//           // Prevent the onLongPress event from firing
//           $scope.longPress = false;
//           // If there is an on-touch-end function attached to this element, apply it
//           if ($attrs.onTouchEnd) {
//             $scope.$apply(function() {
//               $scope.$eval($attrs.onTouchEnd)
//             });
//           }
//         },
//         'cancel': function(coords) {}
//       });

//     }
//   };
// }]);

// Add this directive where you keep your directives
.directive('onLongPress', function($timeout) {
  return {
    restrict: 'A',
    link: function($scope, $elm, $attrs) {
      $elm.bind('touchstart', function(evt) {
        // Locally scoped variable that will keep track of the long press
        $scope.longPress = true;

        // We'll set a timeout for 600 ms for a long press
        $timeout(function() {
          if ($scope.longPress) {
            // If the touchend event hasn't fired,
            // apply the function given in on the element's on-long-press attribute
            $scope.$apply(function() {
              $scope.$eval($attrs.onLongPress)
            });
          }
        }, 600);
      });

      $elm.bind('touchend', function(evt) {
        // Prevent the onLongPress event from firing
        $scope.longPress = false;
        // If there is an on-touch-end function attached to this element, apply it
        if ($attrs.onTouchEnd) {
          $scope.$apply(function() {
            $scope.$eval($attrs.onTouchEnd)
          });
        }
      });
    }
  };
})
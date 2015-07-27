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
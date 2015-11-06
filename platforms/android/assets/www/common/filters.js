angular.module('ddysys.filters')


.filter('num2star', function() {
  return function(input) {
    return (input === '1') && '星标患者' || '普通患者' ;
  };
});
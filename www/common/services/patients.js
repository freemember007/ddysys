angular.module('ddysys.services')

.factory('Patients', function(PostData, $http, $localStorage) {

  return {
    all: function(config) {
      var postData = new PostData('appalldocpatientlist');
      if(angular.isObject(config)) angular.extend(postData, config);
      return $http.post('api', postData);
    },
    getById: function(patientId){
      var postData = new PostData('apppatinfo');
      postData.patId = patientId;
      return $http.post('api', postData);
    },
    star: function(patientId, stared){
      var postData = new PostData('appdocpatientstar');
      postData.patId = patientId;
      postData.star = Number(stared);
      return $http.post('api', postData);
    },
    handleRequest: function(patientId, status){
      var postData = new PostData('apppatapplyhandle');
      postData.patId = patientId;
      postData.status = status;
      postData.reason = '';
      return $http.post('api', postData);
    },
    getLocal: function(){
      return $localStorage.getObject('patients') || {};
    },
    setLocal: function(obj){
      $localStorage.setObject('patients', obj);
    },
    removeLocal: function(){
      $localStorage.setObject('patients', {});
    }
  };
})
angular.module('ddysys.services')

.factory('Appointments', function(PostData, $http) {

  return {
    all: function(type) {
      var postData = new PostData('apphosAddresList');
      postData.limit = 30; //后续可能要加分页
      if(type != '') postData.pStatus = type; //如要取所有的预约，需将该参数留空
      return $http.post('api', postData);
    },
    get: function(id) {
      var postData = new PostData('apphosAddresInfo');
      postData.plusId = id;
      return $http.post('api', postData);
    },
    handle: function(id, pStatus, reason){
      var postData = new PostData('appupdateHosAddres');
      postData.plusId = id;
      postData.pStatus = pStatus;
      postData.reason = reason;
      return $http.post('api', postData);
    },
    formatDate: function(date){
      if(date) return date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') //要加条件，否则会不停报date undefined错误
    },
    formatPStatus: function(pStatus){
      switch(pStatus){
        case "Y":
          return {class:"balanced", text: "已同意"};
          break;
        case "N":
          return {class:"assertive", text: "已拒绝"};
          break;
        case "W":
          return {class:"positive", text: "待处理", todo: true};
          break;
      }
    }

  }

})
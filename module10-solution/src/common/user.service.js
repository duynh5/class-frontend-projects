(function() {
  'use strict';

  angular.module('common')
    .service('UserService', UserService);

  UserService.$inject = ['$http', 'ApiPath'];
  function UserService($http, ApiPath) {
    var service = this;
    service.userInfo = null;

    service.saveUserInfo = function(userInfo) {
      service.userInfo = userInfo;
    };

    service.getUserInfo = function() {
      return service.userInfo;
    };

    service.getMenuItemByNumber = function(menuNumber) {
      var categoryShortName = menuNumber.charAt(0);
      var itemNumber = Number(menuNumber.substring(1)) - 1;
      return $http({
        method: 'GET',
        url: ApiPath + '/menu_items/' + categoryShortName + '/menu_items/' + itemNumber + '.json'
      }).then(function (response) {
        return response.data;
      });
    };

  }

})();

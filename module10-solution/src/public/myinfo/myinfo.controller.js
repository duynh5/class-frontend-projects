(function() {
  'use strict';

  angular.module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['userInfo', 'favoriteMenuItem'];
  function MyInfoController(userInfo, favoriteMenuItem) {
    var $ctrl = this;
    $ctrl.userInfo = userInfo;
    $ctrl.favoriteMenuItem = favoriteMenuItem;
  }

})();

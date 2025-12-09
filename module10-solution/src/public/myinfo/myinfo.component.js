(function() {
  'use strict';

  angular.module('public')
    .component('myinfo', {
      templateUrl: 'src/public/myinfo/myinfo.html',
      bindings: {
        userInfo: '<',
        favoriteMenuItem: '<'
      }
    });

})();

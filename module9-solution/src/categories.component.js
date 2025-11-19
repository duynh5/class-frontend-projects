(function() {
  'use strict';

  angular.module('MenuApp')
    .component('categories', {
      templateUrl: 'src/categories.html',
      bindings: {
        categories: '<',
      },
    });

})();

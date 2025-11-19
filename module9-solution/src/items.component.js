(function() {
  'use strict';

  angular.module('MenuApp')
    .component('items', {
      templateUrl: 'src/items.html',
      bindings: {
        categoryShortName: '<',
        items: '<',
      },
    });

})();

(function() {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['categoryShortName', 'items'];
  function ItemsController(categoryShortName, items) {
    var $ctrl = this;
    $ctrl.categoryShortName = categoryShortName;
    $ctrl.items = items;
  }

})();

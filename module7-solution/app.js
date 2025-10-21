(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
  .filter('currencyFilter', currencyFilter);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

    toBuyList.isEmpty = function() {
      return toBuyList.toBuyItems.length === 0;
    }

    toBuyList.buyItem = function(index) {
      ShoppingListCheckOffService.buyItem(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;
    boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();

    boughtList.isEmpty = function() {
      return boughtList.boughtItems.length === 0;
    }
  }

  ShoppingListCheckOffService.$inject = [];
  function ShoppingListCheckOffService() {
    var service = this;

    service.toBuyItems = [
      { name: "cookies", quantity: 10, pricePerItem: 1 },
      { name: "ham", quantity: 11, pricePerItem: 2 },
      { name: "soda", quantity: 12, pricePerItem: 3 },
      { name: "pizza", quantity: 14, pricePerItem: 6 },
      { name: "carrots", quantity: 20, pricePerItem: 4 }
    ];

    service.boughtItems = [];

    service.getToBuyItems = function() {
      return service.toBuyItems;
    }

    service.getBoughtItems = function() {
      return service.boughtItems;
    }

    service.buyItem = function(index) {
      service.boughtItems.push(service.toBuyItems[index]);
      service.toBuyItems.splice(index, 1);
    }
  }

  function currencyFilter() {
    return function(amount) {
      return '$$$' + parseFloat(amount).toFixed(2);
    }
  }
})();

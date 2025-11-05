(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com/')
    .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'found-items.template.html',
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      }
    };
    return ddo;
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: (ApiBasePath + 'menu_items.json')
      }).then(function (response) {
        var allItems = [];
        var resp = response.data;
        Object.values(resp).map(function (item) {
          if (item.menu_items) {
            allItems = allItems.concat(item.menu_items);
          }
        });

        var foundItems = allItems.filter(item => {
          return item.description.toLowerCase().includes(searchTerm.toLowerCase());
        });

        return foundItems;
      }).catch(function (error) {
        console.log('Error: ', error);
      });
    };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    var nothingFoundMsg = 'Nothing found';
    ctrl.searchTerm = '';
    ctrl.found = [];
    ctrl.message = '';

    ctrl.narrowItDown = function () {
      ctrl.message = '';
      ctrl.found = [];

      var searchTerm = ctrl.searchTerm.trim();
      if (!searchTerm || searchTerm === '') {
        ctrl.message = nothingFoundMsg;
        return;
      }

      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function (foundItems) {
        if (foundItems.length === 0) {
          ctrl.message = nothingFoundMsg;
        } else {
          ctrl.found = foundItems;
        }
      }).catch(function (error) {
        console.log('Error: ', error);
      });
    };

    ctrl.removeItem = function (index) {
      ctrl.found.splice(index, 1);
    };
  }


})();

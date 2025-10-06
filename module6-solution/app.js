(function() {
  'use strict';

  angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunchItemsString = "";
    $scope.message = "";
    $scope.messageClass = "";
    $scope.announceEmptyItemsDetectedString = "";

    $scope.checkLunch = function() {
      var itemsArray = $scope.lunchItemsString.split(',');

      if (itemsArray.length > 1 && itemsArray.some(checkIsItemEmpty)) {
        $scope.announceEmptyItemsDetectedString = "Empty item(s) detected. They will not be counted.";
      } else {
        $scope.announceEmptyItemsDetectedString = "";
      }

      if (!itemsArray || itemsArray.length === 0 || itemsArray.every(checkIsItemEmpty)) {
        $scope.message = "Please enter data first";
        $scope.messageClass = "red border-red";
        return;
      }

      if (itemsArray.filter(checkIsItemNotEmpty).length <= 3) {
        $scope.message = "Enjoy!";
        $scope.messageClass = "green border-green";
      } else {
        $scope.message = "Too much!";
        $scope.messageClass = "green border-green";
      }
    }

    var checkIsItemEmpty = function(item) {
      return item.trim().length === 0;
    }

    var checkIsItemNotEmpty = function(item) {
      return item.trim().length > 0;
    }
  }
})();

(function() {
  'use strict';

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['UserService', '$timeout'];
  function SignUpController(UserService, $timeout) {
    var $ctrl = this;
    var validationTimer;

    $ctrl.user = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      favoriteMenuNumber: ''
    };

    $ctrl.submitted = false;
    $ctrl.savedMessage = false;
    $ctrl.menuItemError = '';

    $ctrl.validateMenuItemAsync = function() {
      if (validationTimer) {
        $timeout.cancel(validationTimer);
      }

      validationTimer = $timeout(function() {
        if ($ctrl.user.favoriteMenuNumber) {
          UserService.getMenuItemByNumber($ctrl.user.favoriteMenuNumber)
            .then(function(menuItem) {
              if (menuItem === null) {
                $ctrl.menuItemError = 'No such menu number exists.';
                $ctrl.signupForm.favoriteMenuNumber.$setValidity('menuItemExists', false);
              } else {
                $ctrl.menuItemError = '';
                $ctrl.signupForm.favoriteMenuNumber.$setValidity('menuItemExists', true);
              }
            });
        } else {
          $ctrl.menuItemError = '';
          $ctrl.signupForm.favoriteMenuNumber.$setValidity('menuItemExists', true);
        }
      }, 200);
    };

    $ctrl.submitForm = function() {
      if ($ctrl.signupForm.$valid) {
        $ctrl.submitted = true;

        UserService.saveUserInfo({
          firstName: $ctrl.user.firstName,
          lastName: $ctrl.user.lastName,
          email: $ctrl.user.email,
          phone: $ctrl.user.phone,
          favoriteMenuNumber: $ctrl.user.favoriteMenuNumber
        });

        $ctrl.savedMessage = true;
      }
    };
  }

})();

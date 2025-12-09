(function() {
  'use strict';

  angular.module('public')
    .component('signup', {
      templateUrl: 'src/public/signup/signup-form.html',
      bindings: {
      },
      controller: 'SignUpController',
      controllerAs: '$ctrl'
    });

})();

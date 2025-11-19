(function() {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Default route
    $urlRouterProvider.otherwise('/');

    // Home state
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/home-view.html'
      })

      // Categories state
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/categories-view.html',
        controller: 'CategoriesController',
        controllerAs: '$ctrl',
        resolve: {
          categories: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      // Items state
      .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'src/items-view.html',
        controller: 'ItemsController',
        controllerAs: '$ctrl',
        resolve: {
          categoryShortName: ['$stateParams', function($stateParams) {
            return $stateParams.categoryShortName;
          }],
          items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      });
  }


})();

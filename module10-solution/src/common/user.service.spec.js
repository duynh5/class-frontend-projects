describe('UserService', function() {
  var UserService;
  var $httpBackend;
  var ApiPath;

  beforeEach(function() {
    module('common');
    inject(function ($injector) {
      UserService = $injector.get('UserService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('getMenuItemByNumber', function() {

    it('should return the menu item when it exists', function() {
      var mockMenuData = {
        description: "chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra",
        name: "Orange Chicken",
        price_large: 9.75,
        short_name: "L1"
      };

      $httpBackend.expectGET(ApiPath + '/menu_items/L/menu_items/0.json').respond(mockMenuData);

      var result;
      UserService.getMenuItemByNumber('L1').then(function(menuItem) {
        result = menuItem;
      });

      $httpBackend.flush();

      expect(result).toBeDefined();
      expect(result.name).toEqual('Orange Chicken');
      expect(result.short_name).toEqual('L1');
    });
  });

});

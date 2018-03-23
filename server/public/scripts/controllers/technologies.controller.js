myApp.controller('TechnologiesController', ['UserService', function(UserService) {
    console.log('TechnologiesController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    
  }]);
  
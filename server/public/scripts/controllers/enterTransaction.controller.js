myApp.controller('EnterTransactionController', ['UserService', function(UserService) {
    console.log('EnterTransactionController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    
  }]);
  
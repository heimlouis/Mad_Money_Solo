myApp.controller('ReportingController', ['UserService', function(UserService) {
    console.log('ReportingController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    
  }]);
  
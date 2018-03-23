myApp.controller('AccountOverviewController', ['UserService', function(UserService) {
    console.log('AccountOverviewController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.transactionHistory = UserService.transactionHistory;
    self.accountOverview = UserService.accountOverview;
    self.getAccountOverview = UserService.getAccountOverview;
    self.getAccountOverview();
    
  }]);
  
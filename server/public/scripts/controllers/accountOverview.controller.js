myApp.controller('AccountOverviewController', ['UserService', '$location', function(UserService, $location) {
    console.log('AccountOverviewController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.transactionHistory = UserService.transactionHistory;
    self.accountOverview = UserService.accountOverview;
    self.getAccountOverview = UserService.getAccountOverview;
    self.getAccountOverview();
  
    self.enterTransaction = function(account_id){
      console.log( "in enterTransaction", account_id );
      $location.path(`/enterTransaction/${account_id}`);
      }

  }]);
  
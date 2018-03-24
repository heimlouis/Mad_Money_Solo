myApp.controller('TransactionHistoryController', ['UserService', function(UserService) {
    console.log('TransactionHistoryController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.getAccountOverview = UserService.getAccountOverview;
    self.transactionHistory = UserService.transactionHistory;
    self.getTransactionHistory = UserService.getTransactionHistory;
    self.getTransactionHistory();
  }]);
  
myApp.controller('TransactionHistoryController', ['UserService', function (UserService) {
  console.log('TransactionHistoryController created');
  var self = this;
  // console.log('****self',self);
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.getAccountOverview = UserService.getAccountOverview;
  self.transactionHistory = UserService.transactionHistory;
  self.getTransactionHistory = UserService.getTransactionHistory;
  self.getTransactionHistory();

  self.delete = function (deleteRecordId) {
    console.log('transaction to delete', deleteRecordId);
    //call the function on the service
    self.userService.deleteRegisterTransactionId(deleteRecordId);
  }

}]);



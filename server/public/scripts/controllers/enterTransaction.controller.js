myApp.controller('EnterTransactionController', ['UserService', '$routeParams', function (UserService, $routeParams) {
  console.log('EnterTransactionController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.transactionHistory = UserService.transactionHistory;
  self.accountOverview = UserService.accountOverview;
  self.getAccountOverview = UserService.getAccountOverview;
  self.enterTransaction = UserService.enterTransaction;
  self.upload = UserService.upload;
  self.objectToSend = {
    account_name: '',
    date: '',
    amount: '',
    category: '',
    transaction_title: '',
    description: '',
    imageUrl: ''
  }

  self.getAccountOverview();

  self.createTransaction = function () {
    self.enterTransaction(self.objectToSend, self.accountOverview.selectedAccount);
  }

  if ($routeParams.account_id) {
    console.log('route params', $routeParams.account_id);
    self.objectToSend.account_id = $routeParams.account_id
  }

console.log('objectToSend', self.objectToSend);

}]);

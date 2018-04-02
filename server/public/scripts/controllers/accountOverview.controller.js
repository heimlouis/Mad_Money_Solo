myApp.controller('AccountOverviewController', ['UserService', '$location', function (UserService, $location) {
  console.log('AccountOverviewController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.transactionHistory = UserService.transactionHistory;
  self.accountOverview = UserService.accountOverview;
  self.getAccountOverview = UserService.getAccountOverview;
  self.createAccount = UserService.createAccount;
  self.enterAccount = UserService.enterAccount;
  self.accountObjectToSend = {
    account_name: '',
    budget_amount: ''
  }

  self.getAccountOverview();

  self.enterTransaction = function (account_id) {
    console.log("in enterTransaction", account_id);
    $location.path(`/enterTransaction/${account_id}`);
  }

  if (self.userObject.userName) {
    console.log('self.userObject.userName', self.userObject.userName);
    self.accountObjectToSend.user_name = self.userObject.userName
  }

  self.createAccount = function(user_name){
    self.enterAccount(self.accountObjectToSend)
  }

  //   console.log('in createAccount Function');
  //   console.log('in createAccount1', self.accountObjectToSend);//this logs the full createAccount Object
  //   // console.log('in createAccount2', self.accountToCreate.user_name);
  //   // self.accountToCreate(user_name);
  //   self.getAccountOverview();
  //   // $location.path('/enterTransaction')
  // }
  
}]);
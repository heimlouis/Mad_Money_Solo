myApp.controller('AccountOverviewController', ['UserService', '$location', function (UserService, $location) {
  console.log('AccountOverviewController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.transactionHistory = UserService.transactionHistory;
  self.accountOverview = UserService.accountOverview;
  self.getAccountOverview = UserService.getAccountOverview;
  self.accountToCreate = {
    account_name: '',
    budget_amount: '',
    user_name: ''
  }

  self.getAccountOverview();

  self.enterTransaction = function (account_id) {
    console.log("in enterTransaction", account_id);
    $location.path(`/enterTransaction/${account_id}`);
  }

  if (self.userObject.userName) {
    console.log('self.userObject.userName', self.userObject.userName);
    self.accountToCreate.uesr_name = self.userObject.userName
  }

  // console.log('testtest', self.accountToCreate);

  // self.enterAccount = function (user_name) {
  //   console.log("in enterAccount", user_name);
  //   $location.path(`/enterAccount/${uesr_name}`);
  // }
  

}]);

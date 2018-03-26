myApp.controller('EnterTransactionController', ['UserService', function(UserService) {
    console.log('EnterTransactionController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    
  self.enterTransaction = function(newTransaction){
    console.log('adding new transaction:', newTransaction);
    UserService.enterTransaction(newTransaction);
  }//end add new transation
}]);
  
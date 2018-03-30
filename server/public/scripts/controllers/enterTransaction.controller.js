myApp.controller('EnterTransactionController', ['UserService', function(UserService) {
    console.log('EnterTransactionController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.transactionHistory = UserService.transactionHistory;
    self.accountOverview = UserService.accountOverview;
    self.getAccountOverview = UserService.getAccountOverview;
    self.enterTransaction = UserService.enterTransaction;
    // self.thing = 'thing';
    // self.enterTransaction();
    self.getAccountOverview();
    
  self.getAccountOverview = function(enterTransaction){
    console.log('adding new transaction:', enterTransaction);
    UserService.enterTransaction(enterTransaction);
  }//end add new transation

  self.createTransaction = function(){
    console.log( "in enterTransaction" );
    let objectToSend = {
      account_name: self.accountOveraccount_name,
      date: self.date,
      amount: self.amount,
      category: self.category,
      transaction_title: self.transaction_title,
      description: self.description
    }
    console.log( 'obj:', objectToSend );
    self.enterTransaction(objectToSend);
  }

  // self.enterTransaction();
  
}]);
  
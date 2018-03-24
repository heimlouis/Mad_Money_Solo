myApp.service('UserService', ['$http', '$location', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.transactionHistory = {list:[]}
  self.accountOverview = {list:[]}


  self.getuser = function(){
    // console.log('UserService -- getuser');
    $http.get('/api/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            // console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/login");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/login");
    });
  },

  self.getuser();//**this might need to be updated**

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/api/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  },

  self.getTransactionHistory = function () {
      console.log('In getTransactionHistory');
      $http({
          method:'GET',
          url:'/transactions/transaction'
      }).then((response)=>{
          self.transactionHistory.list = response.data;
          console.log(self.transactionHistory);
          }).catch((error)=>{
              console.log('error in self.getTransactionHistory',error);
          });
  };//end getAllTransactions

  self.getAccountOverview = function () {
    console.log('In getAccountOverview');
    $http({
        method:'GET',
        url:`/transactions/account/${self.userObject.userName}`
    }).then((response)=>{
        // console.log(self.userObject.userName);
        self.accountOverview.list = response.data;
        console.log(self.accountOverview);
        }).catch((error)=>{
            console.log('error in self.getAccountOverview',error);
        });
};//end getAccountOverview

  self.postTransaction = function(){
      console.log('in postTransaction');
      $http({
          method:'POST',
          url:'/transactions/transaction',
          data: self.newTransaction
      }).then((response)=>{
          console.log('Added transaction:', response);
          self.getAllTransactions();
      }).catch((error)=>{
          console.log('error in self.postTransaction',error);
      });
  };//end postTransaction

}]);

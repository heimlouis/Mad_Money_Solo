myApp.service('UserService', ['$http', '$location', function ($http, $location) {
    console.log('UserService Loaded');
    var self = this;
    self.userObject = {};
    self.transactionHistory = {};
    self.accountOverview = {};
    self.accountOverviewObject = {};
    self.account_name = '';
    self.account_id = '';

    self.getuser = function () {
        // console.log('UserService -- getuser');
        $http.get('/api/user').then(function (response) {
            if (response.data.username) {
                // user has a curret session on the server
                self.userObject.userName = response.data.username;
                // console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
            } else {
                console.log('UserService -- getuser -- failure');
                // user has no session, bounce them back to the login page
                $location.path("/login");
            }
        }, function (response) {
            console.log('UserService -- getuser -- failure: ', response);
            $location.path("/login");
        });
    }

    self.getuser();//**this might need to be updated**

    self.logout = function () {
        console.log('UserService -- logout');
        $http.get('/api/user/logout').then(function (response) {
            console.log('UserService -- logout -- logged out');
            $location.path("/login");
        });
    }

    self.getTransactionHistory = function () {
        console.log('In getTransactionHistory');
        $http({
            method: 'GET',
            url: `/transactions/transaction/${self.userObject.userName}`
        }).then((response) => {
            self.transactionHistory.list = response.data;
            console.log(self.transactionHistory);
        }).catch((error) => {
            console.log('error in self.getTransactionHistory', error);
        });
    };//end getAllTransactions

    self.getTransactionHistory();

    self.getAccountOverview = function () {
        console.log('In getAccountOverview');
        $http({
            method: 'GET',
            url: `/transactions/account/${self.userObject.userName}`
        }).then((response) => {
            console.log('userObject.userName', self.userObject.userName);
            self.accountOverview.list = response.data;
            self.accountOverviewObject = response.data[0];
            console.log(self.accountOverviewObject.account_id);
            console.log(self.accountOverviewObject.account_name);

            self.getTransactionHistory();
        }).catch((error) => {
            console.log('error in self.getAccountOverview', error);
        });
    };//end getAccountOverview

    self.enterTransaction = function (transaction) {
        console.log('in enterTransaction', transaction);
        let account_id = transaction.account_id
        $http({
            method: 'POST',
            // url:`/transactions/transaction/${self.accountOverviewObject.account_id}`,
            url: `/transactions/transaction/${self.accountOverviewObject.account_id}`,
            data: transaction
        }).then((response) => {
            //   self.accountOverview.list = response.data;
            self.account_id = response.data.account_id;
            console.log('Added transaction:', response);
            self.getTransactionHistory();
        }).catch((error) => {
            console.log('error in self.accountOverview', error);
        });
    };//end enterTransaction

    self.deleteRegisterTransactionId = function (deleteRegId){
        console.log('delete', deleteRegId);
        $http({
            method: 'DELETE',
            // url:`/transactions/transaction/${self.accountOverviewObject.account_id}`,
            url: `/transactions/transaction/${deleteRegId}`
        }).then((response) => {
            console.log('Deleted transaction:', response);
            self.getTransactionHistory();
        }).catch((error) => {
            console.log('error in self.accountOverview', error);
        });
    }

}]);
myApp.service('UserService', ['$http', '$location', function ($http, $location) {
    console.log('UserService Loaded');
    var self = this;
    self.userObject = {};
    self.transactionHistory = {};
    self.accountOverview = { list: [] };
    self.accountOverviewObject = {};
    self.account_name = '';
    self.account_id = '';
    // self.transaction = {};
    self.client = filestack.init("AaimOvRW2Qi51juomeEunz");
    self.imageUrl = '';

    self.getuser = function () {
        $http.get('/api/user').then(function (response) {
            if (response.data.username) {
                // user has a curret session on the server
                self.userObject.userName = response.data.username;
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

    self.getuser();

    self.logout = function () {
        console.log('UserService -- logout');
        $http.get('/api/user/logout').then(function (response) {
            console.log('UserService -- logout -- logged out');
            $location.path("/login");
        });
    }

    self.getTransactionHistory = function () {
        console.log('In getTransactionHistory', self.accountOverview);
        $http({
            method: 'GET',
            url: `/transactions/transaction/${self.userObject.userName}`
        }).then((response) => {
            self.transactionHistory.list = response.data;
            console.log('transactionHistory', self.transactionHistory);
            console.log('account_name', self.account_name);

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

            self.getTransactionHistory();
        }).catch((error) => {
            console.log('error in self.getAccountOverview', error);
        });
    };//end getAccountOverview

    self.enterTransaction = function (transaction, account_id) {
        transaction.imageUrl = self.imageUrl;
        console.log('in enterTransaction', transaction);
        $http({
            method: 'POST',
            url: `/transactions/transaction/${transaction.account_id}`,
            data: transaction
        }).then((response) => {
            self.account_id = response.data.account_id;
            console.log('Added transaction:', response);
            self.getTransactionHistory();
        }).catch((error) => {
            console.log('error in enterTransaction', error);
        });
    };//end enterTransaction

    self.deleteRegisterTransactionId = function (deleteRegId) {
        console.log('delete', deleteRegId);
        $http({
            method: 'DELETE',
            url: `/transactions/transaction/${deleteRegId}`
        }).then((response) => {
            console.log('Deleted transaction:', response);
            self.getTransactionHistory();
        }).catch((error) => {
            console.log('error in deleteRegisterTransaction', error);
        });
    }

    self.upload = function () {
        console.log('in upload');
        self.client.pick({
            accept: 'image/*',
            maxFiles: 1
        }).then(function (results) {
            alert('image successful');
            self.imageUrl = results.filesUploaded[0].url;
            console.log('self.imageUrl', self.imageUrl);
        })
    }
}]);
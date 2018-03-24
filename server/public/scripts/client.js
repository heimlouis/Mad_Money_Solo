var myApp = angular.module('myApp', ['ngRoute']);

console.log('Angular good to go!');

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  console.log('myApp -- config')
  $routeProvider
    .when('/', {
      redirectTo: 'login'
    })
    .when('/login', {
      templateUrl: '/views/templates/accountOverview.html',
      controller: 'AccountOverviewContoller as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/accountOverview', {
      templateUrl: '/views/templates/accountOverview.html',
      controller: 'AccountOverviewController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/enterTransaction', {
      templateUrl: '/views/templates/enterTransaction.html',
      controller: 'EnterTransactionController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/transactionHistory', {
      templateUrl: '/views/templates/transactionHistory.html',
      controller: 'TransactionHistoryController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/reporting', {
      templateUrl: '/views/templates/reporting.html',
      controller: 'ReportingController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })    
    .when('/technologies', {
      templateUrl: '/views/templates/technologies.html',
      controller: 'TechnologiesController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as vm',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as vm'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);

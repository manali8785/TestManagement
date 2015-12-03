var app = angular.module("testApp", ["ui.router"]);

app.config(['$stateProvider',function($stateProvider){
    $stateProvider.state('testList', {
        url: '/tests',
        templateUrl: '/app/tests/_list.html',
        controller: 'TestListController'

            //function($scope){
            // $scope.testId=$stateParams.id;
            // this is not required - $stateParams that is
            // define a new controller for this one and move it out, like I did for the TestDetailController
            // There are no templates!!!
        //}
    }).state('testDetail', {
        url: '/tests/:id',
        templateUrl: '/app/tests/_detailed.html',
        // Do not give the controller here, as it will be difficult to test. Define it outside
        controller: 'TestDetailController'
    });

    // you need two states here -- one for the list view and the other for the test detail
    // I will do that now ...
    // Hi .. let me take a look ...
}]);

app.controller('TestDetailController', function($scope,$stateParams,TestService){
    $scope.testid = $stateParams.id; // good coding practice - let your code breathe
   // console.log($scope.testid);
    // first thing, the service is not designed to return a single test, we will
    // pass all the test data to this controller - I know, that is beyond the scope
    // of this controller, but you can change the logic later.


    // Very Important - TestService.testList() returns a promise, not data , hence the command
    // $scope.questions=TestService.testList();
    // is incorrect.

    var promise = TestService.testList(); // point to remember is that this returns a promise

    console.log('promise: ', promise);
    promise.then(function (tests) {
        // tests is an array of tests ...
        // success ful resolve function (the one that you sent list data into)
        // here we loop over all the tests and find the relevant one ...
        console.log('All tests:', tests); // this is working now ...
        // Any questions at this point?
        // ? NO i got my mistake
        // This is where we search for the data
        var tests_match_id = tests.filter(function (test) {
            return test._id === $scope.testid;
        });
        if (tests_match_id.length > 0) {
            $scope.test = tests_match_id[0];

        }// means we have a match
    });


    console.log("Questions:",$scope.questions);

});



app.controller("TestListController", function($scope, $http,TestService){
    $scope.message = "Hello";

    $http.get("/validate").then(function(config){
        $scope.user = config.data;
    //    console.log(config.data);
    }, function(config){
        if(config.status === 401) window.location = location.origin + "/auth/google";
    });

    var promise = TestService.getTests()
    promise.then(function (data) {
        $scope.tests = data;
    //  console.log("tests:"+$scope.tests);
    });


});

app.service('TestService',function($http,$q) {

    var _list_of_tests,questions;
    var TestService = this;
    this.getTests=function (){

        return $q(function (resolve, reject) {
            $http.get("/tests").then(function (config) {
                console.log("data:",config.data);
                _list_of_tests = config.data; // You need to store the list of tests, for usage later
                resolve(config.data);
            }, function (config) {
                console.log("There was an error!!!")
                reject(config);
            });
        });

    }
    this.testList = function () {
        console.log('testList function');
        // this function will be used by the TestDetailController
        // to search for details of a test (questions, author etc, based on the test id)
        // use this function just as you were using getTests.. any questions?

        if (typeof _list_of_tests === 'undefined') {
            return TestService.getTests();
        } else {
            var deferred = $q.defer();
            // this should return a promise, not tests data.
            deferred.resolve(_list_of_tests); // this line sends back the set of tests into the resolve function
            return deferred.promise;
        }

    }
});

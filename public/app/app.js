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
}]);

app.controller('TestDetailController', function($scope,$stateParams){
    $scope.testid = $stateParams.id; // good coding practice - let your code breathe
    console.log($scope.testid);
});


app.service('TestService',function($http,$q) {

    var _list_of_tests;
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
        // this function will be used by the TestDetailController
        // to search for details of a test (questions, author etc, based on the test id)
        // use this function just as you were using getTests.. any questions?
        // ? ?? nothing
        // do want me to show you where to use this?
        // ? no i will give it a try first

        // great! let me commit all the changes, so we can revisit it if you want to
        if (typeof _list_of_tests === 'undefined') {
            return TestService.getTests();
        } else {
            var deferred = $q.defer();
            deferred.resolve(_list_of_tests);
            return deferred.promise;
        }
    }
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
    //    console.log("tests:"+$scope.tests);

    });

     $scope.testDetailFn=function(){
         console.log($scope.testId);
     }


});
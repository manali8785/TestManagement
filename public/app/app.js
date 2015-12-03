var app = angular.module("testApp", ["ui.router"]);


app.service('TestService',function($http,$q) {
    this.getTests=function (){

        return $q(function (resolve, reject) {
            $http.get("/tests").then(function (config) {
                console.log("data:",config.data);
                resolve(config.data);
            }, function (config) {
                console.log("There was an error!!!")
                reject(config);
            });
        });

     }
});

app.controller("mainCtrl", function($scope, $http,TestService){
    $scope.message = "Hello";
    $http.get("/validate").then(function(config){
        $scope.user = config.data;
        console.log(config.data);
    }, function(config){
        if(config.status === 401) window.location = location.origin + "/auth/google";
    });
    var promise = TestService.getTests()

    promise.then(function (data) {
        $scope.tests = data;
        console.log("tests:"+$scope.tests);

    });

});
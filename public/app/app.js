var app = angular.module("testApp", ["ui.router"]);

app.controller("mainCtrl", function($scope, $http){
    $scope.message = "Hello";
    $http.get("/validate").then(function(config){
        $scope.user = config.data;
        console.log(config.data);
    }, function(config){
        if(config.status === 401) window.location = location.origin + "/auth/google";
    });
});
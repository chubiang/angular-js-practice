var myApp = angular.module('myApp', ['ngRoute','ngAnimate']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "main.html"
    })
    .when("/ex01", {
      templateUrl: "ex01.html"
    })
    .when("/ex02", {
      templateUrl: "ex02.html"
    })
    .when("/ex03", {
      templateUrl: "ex03.html"
    })
    .otherwise ({
      templateUrl: "main.html"
    });
}]);


// ex02.html
myApp.controller('myCtrl02', ['$scope', '$http', '$q', '$log', function($scope, $http, $q, $log) {

    $scope.orderItem = ['name','age'];
    //promise 객체 선언
    var deferred = $q.defer();

    $http.get('data/persons.json').then(function(response) {
      $scope.persons = response.data;
      deferred.resolve(response);
    })
    .catch(function(error) {
      deferred.reject(error);
      throw error;
    })
    .then(function(){
      $log.info("성공 후 수행할 첫번째 미션!");
    })
    .finally(function(final) {
      $log.info("마지막 수행할 첫번째 미션!");
    });

    //person Grid
    $scope.gridOptions = {
        data: 'persons',
        enablePinning: true,
        columnDefs: [{ field: "name", width: 120, pinned: true },
                    { field: "age", width: 120 }]
    };


    $scope.orderByMe = function (x) {
      $scope.standard = x;
    }

    $scope.insertPerson = function () {
      $scope.persons.push ( {
        name: $scope.insName,
        age : $scope.insAge } );

        $scope.insName = "";
        $scope.insAge  = "";
    }

    $scope.deletePerson = function (index) {
      $scope.persons.splice(index,1);
    }
}]);

// ex01.html
myApp.controller('myCtrl', ['$scope', function ($scope) {
  $scope.submit = function (text, len) {
  	alert(text + ', ' + len);
  };
}]);

myApp.directive('textBox', function() {
  return {
    restrict: 'E',
    scope: {
    	onSubmit: "&"
    },
    template: '<input type="text" ng-model="value"/><button type="submit" ng-click="onSubmit({ text: value, len: value.length })">Submit!</button>'
  }
});

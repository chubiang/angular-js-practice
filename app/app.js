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
myApp.controller('myCtrl02', ['$scope', 'http', function($scope, $http) {
    $scope.persons = [
        {name:'Jani', age:23},
        {name:'Carl', age:26},
        {name:'Margareth', age:29},
        {name:'Hege', age:32},
        {name:'Joe', age:35},
        {name:'Gustav', age:21}
    ];

    $http.get('data/person.json').success( function() {

    });

    $scope.orderByMe = function (x) {
      $scope.standard = x;
    }

    $scope.insertPerson = function () {
      $scope.persons.push ( {
        name: $scope.ins.name,
        age : $scope.ins.age } );

        $scope.ins.name = "";
        $scope.ins.age  = "";
    }

    $scope.deletePerson = function (index) {
      $scope.persons.splice(index,1);
    }
});

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

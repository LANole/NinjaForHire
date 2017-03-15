var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: 'NinjaController'
    })
    .when('/contact', {
      templateUrl: '/views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact-success', {
      templateUrl: '/views/contact-success.html',
      controller: 'ContactController'
    })
    .when('/directory', {
      templateUrl: '/views/directory.html',
      controller: 'NinjaController'
    }).otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);

}]);

myNinjaApp.directive('randomNinja', [function(){
  return{
    restrict: 'E',
    scope: {
      ninjas: '=',  // the equals sign binds the data and will find the attribute in the html
      title: '=' //again finds in the directive and html and binds to it
    },
    templateUrl: 'views/random.html', //everytime the directive is call it will find this template to diplay
    transclude: true,             //tells angular to include html between custom directive tags
    replace: true,               //tells DOM to replace custom directive name with outer most tag to comply with DOM styles
    controller: function($scope){
      $scope.random = Math.floor(Math.random() * 4); // *4 will generate one of the images between 0 and 3 with .floor rounding down
    }
  }
}]);

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http){

$scope.removeNinja = function(ninja){
  var removedNinja = $scope.ninjas.indexOf(ninja);
  $scope.ninjas.splice(removedNinja, 1);
}

$scope.addNinja = function(){
  $scope.ninjas.push({
    name: $scope.newninja.name,
    belt: $scope.newninja.belt,
    rate: parseInt($scope.newninja.rate),
    available: true
  });

  $scope.newninja.name = "";
  $scope.newninja.belt = "";
  $scope.newninja.rate = "";
};

$scope.removeAll = function(){
  $scope.ninjas = [];
};

$http.get('data/ninjas.json').then(function(response){
  $scope.ninjas = response.data;
});

}]);

myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location){

  $scope.sendMessage = function(){
    $location.path('/contact-success');
    $locationProvider.hashPrefix('!');
  };
}]);

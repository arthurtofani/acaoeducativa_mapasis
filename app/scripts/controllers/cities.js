'use strict';

/**
 * @ngdoc function
 * @name mapaSistensinoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mapaSistensinoApp
 */
angular.module('mapaSistensinoApp')
  .controller('CitiesCtrl', function ($scope, $http, $rootScope, $routeParams, $location) {
    $scope.city = null;
    $rootScope.$watch("selectedCityId", function(){
    	$scope.city = $rootScope.selectedCity;
      $scope.defineCity();
    })
    
    $scope.defineCity = function(cityid){
      var c = $scope.city
      globalmap.setView([c.lat, c.lng], 7)
    }

    $scope.back = function(){
      $location.path("/#/");
    }

    if($rootScope.loading){
      $rootScope.$watch("loading", function(){
        if(!$rootScope.loading){
        	$scope.setCity($routeParams.city_id)	
        }        
      })
    } else {
      $scope.setCity($routeParams.city_id)
    }


    
  });

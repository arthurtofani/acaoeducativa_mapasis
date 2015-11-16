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

      // var lat = c.lat
      var lat = parseFloat(c.lat.replace(",", "."))+0
      globalmap.setView([lat, c.lng], 9)

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

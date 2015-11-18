'use strict';
var globalmap
var layer
/**
 * @ngdoc function
 * @name mapaSistensinoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mapaSistensinoApp
 */
angular.module('mapaSistensinoApp')
  .controller('MainCtrl', function ($scope, $http, $rootScope) {

    $scope.ufs = null;
    $scope.cities = null;
    $scope.loading = true;
    $scope.city = null

    $rootScope.$watch("selectedCityId", function(){
    	$scope.city = $rootScope.selectedCity;
    })

    $scope.loadData = function(){
      if($scope.cities==null){
        if($rootScope.loading){
          $rootScope.$watch("loading", function(){
            console.log("viu")
            if(!$rootScope.loading) $scope.loadDataFromRootScope();
          })
        } else {
          $scope.loadDataFromRootScope();
        }
      }
    }

    $scope.selectMap = function(v){
      L.mapbox.accessToken = 'pk.eyJ1IjoiYWNhb2VkdWNhdGl2YSIsImEiOiJwcFlZQ0ZBIn0.OgLzvCt_Kzb_EeKXRYfTYw';
     // var lmap = (!v ? 'acaoeducativa.mg3o1opk' : 'acaoeducativa.mmoj2gej')
      if(globalmap) globalmap.remove();
      globalmap = L.mapbox.map('map', 'acaoeducativa.o6jlc4ii');
      layer = L.mapbox.tileLayer('acaoeducativa.sist_idh')
      layer.setZIndex(1)
      layer.addTo(globalmap)


    }


    $scope.bindMouseClick = function(){
      $(".leaflet-container").click(function(e){
        var cityId = $(".cod_munic").text();
        $rootScope.setCity(cityId);
        $scope.$apply();
      })
    }
    $scope.$watch("selectedCity", function(){
      if(!$scope.selectedCity) return;
      try {
        $rootScope.setCity($scope.selectedCity.originalObject.id);
      } catch(e){

      }

    })
    $scope.loadDataFromRootScope = function(){
      $scope.ufs = $rootScope.ufs;
      $scope.cities = $rootScope.cities;
      $scope.loading = false;
      $scope.bindMouseClick()
    }



    $scope.loadData();
    $scope.selectMap();
  });

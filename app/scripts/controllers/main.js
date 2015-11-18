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
    $scope.currentMap = 0;

    $rootScope.$watch("selectedCityId", function(){
    	$scope.city = $rootScope.selectedCity;
    })
    $scope.layers = []
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
      L.mapbox.accessToken = 'pk.eyJ1IjoiYWNhb2VkdWNhdGl2YSIsImEiOiJwcFlZQ0ZBIn0.OgLzvCt_Kzb_EeKXRYfTYw';
     // var lmap = (!v ? 'acaoeducativa.mg3o1opk' : 'acaoeducativa.mmoj2gej')
      if(globalmap) globalmap.remove();
      globalmap = L.mapbox.map('map', 'acaoeducativa.o6mn61cn').setView([-15, -55], 4);
      //globalmap.setCenter([-47.8455,-15.7711,6])
      $scope.layers[0] = L.mapbox.tileLayer('acaoeducativa.aaa')
      $scope.layers[0].addTo(globalmap)
      $scope.layers[1] = L.mapbox.tileLayer('acaoeducativa.sist_idh')
      $scope.layers[1].addTo(globalmap)
      $scope.layers[2] = L.mapbox.tileLayer('acaoeducativa.sist_plano_mun')
      $scope.layers[2].addTo(globalmap)
      $scope.layers[3] = L.mapbox.tileLayer('acaoeducativa.sist_proprio')
      $scope.layers[3].addTo(globalmap)
      $scope.lastZindex = 0


    }

    $scope.selectMap = function(v){
      $scope.currentMap = v;
      $scope.layers[$scope.currentMap].setZIndex(++$scope.lastZindex)
    }

    $scope.showActive = function(n){
      return ( n == $scope.currentMap ? "active" : "oi")
      //console.log( n == $scope.currentMap, n,  $scope.currentMap)
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
    $scope.selectMap(0);
  });

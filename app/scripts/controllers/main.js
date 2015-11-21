'use strict';
var globalmap
var layer
var marker
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
      if($scope.city){
        marker.setLatLng([parseFloat($scope.city.lat.replace(",", ".")),parseFloat($scope.city.lng.replace(",", "."))])

      }

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

      marker = L.marker([0, 0], {
        icon: L.mapbox.marker.icon({
          'marker-color': '#f86767'

        })
      });
      marker.addTo(globalmap);


    }

    $scope.selectMap = function(v){
      $scope.currentMap = v;
      $scope.layers[$scope.currentMap].setZIndex(++$scope.lastZindex)
    }

    $scope.getCityName = function(){
      if($scope.city){
        return $scope.city.cidade + " / " + $scope.city.uf;
      } else {
        return "Clique em uma cidade"
      }
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

    $scope.zoomToCity = function(){
      console.log($scope.city)
      globalmap.setView([$scope.city.lat, $scope.city.lng], 7)
    }

    $scope.$watch("selectedCity", function(){
      if(!$scope.selectedCity) return;
      try {
        $rootScope.setCity($scope.selectedCity.originalObject.id);
        setTimeout(function(){
          $scope.zoomToCity()
          $scope.$apply()
        }, 500)

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

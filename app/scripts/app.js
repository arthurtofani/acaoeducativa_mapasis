var jj
'use strict';

/**
 * @ngdoc overview
 * @name mapaSistensinoApp
 * @description
 * # mapaSistensinoApp
 *
 * Main module of the application.
 */
angular
  .module('mapaSistensinoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch', 
    'angucomplete-alt'
  ]).run(function ($rootScope, $http){
    $rootScope.loading = true;
    $rootScope.ufs = null
    $rootScope.cities = null;
    $rootScope.selectedCityId = -1;
    $rootScope.getUfs = function(){
      var t = this;
      console.log("buscando estados")
      $http.get("/data/states.json").success(function(dt){
        $rootScope.ufs = dt;
        $rootScope.getCities();
      })
    }
    $rootScope.getCities = function(){
      console.log("buscando cidades")
      var t = this;
      $http.get("/data/cities.json").success(function(dt){
        $rootScope.cities = dt;
        jj = dt;
        $rootScope.loading = false;
      })
    }
    $rootScope.setCity = function(id){
      $rootScope.selectedCity = $.grep($rootScope.cities, function(e){ return e.id == id; })[0];
      $rootScope.selectedCityId = $rootScope.selectedCity.id;
    }
    $rootScope.getUfs()
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/cities/:city_id', {
        templateUrl: 'views/cities.html',
        controller: 'CitiesCtrl'
      })      
      .when('/states/:state_id', {
        templateUrl: 'views/states.html',
        controller: 'StatesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).controller('headerController', function ($scope, $rootScope, $http){


  });

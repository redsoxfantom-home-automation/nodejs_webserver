var lightsApp = angular.module('lights', []);

lightsApp.controller('MainController', ['$scope', 'lightsWebService', function($scope, lightsWebService) {
	var vm = {};

	vm.lights = [];

	vm.refreshLights = function() {
		lightsWebService.getLights().then(function(response) {
			vm.lights = response.data;
		});
	};

   vm.toggleLightPower = function(lightId, currentLightPower) {
      console.log("Received request to toggle light")
      lightsWebService.setLight(lightId, !currentLightPower).then(function(response) {
         vm.refreshLights();
      });
   };

	$scope.vm = vm;
}]);

lightsApp.service('lightsWebService', ['$http', function ($http) {

	var root = '/lights';

	return {
		getLights: function() {
			return $http.get(root);
		},

      setLight: function(lightId, lightPower) {
         data = {
            'id' : lightId,
            'power' : lightPower
         };

         return $http.post(root,data);
      }
	}
}]);

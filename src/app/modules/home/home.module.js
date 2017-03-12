(function() {
	'use strict';
	angular
		.module('cac.modules.home',[])
		.controller('HomeController',HomeController);

		function HomeController() {
			this.test="success is in thy hands";
		}
})();

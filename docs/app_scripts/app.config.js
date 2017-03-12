(function() {
    'use strict';
    AppConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
    angular
        .module('cac')
        .config(AppConfig);

    function AppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/cac/home');

        $stateProvider
            .state('cac', {
                abstract: true,
                url: '/cac',
                views: {
                    content: {
                        templateUrl: 'modules/modules.partial.html',
                    }
                }
            })
            .state('cac.home', {
                url: '/home',
                views: {
                    content: {
                        templateUrl: 'modules/home/home.partial.html',
                        controller:'HomeController',
                        controllerAs:'vm'
                    }
                }
            });
    }
})();

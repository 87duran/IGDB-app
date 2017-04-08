var app = angular.module('igdb', ['ui.router', 'ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true); //Remove # in URL
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url:'/',
            templateUrl: '/views/home.html',
            controller: 'mainCtrl'
        })
        .state('resultsList', {
            url: '/resultslist',
            templateUrl: '/views/resultsList.html',
            controller: 'mainCtrl'
        })
        .state('singleResult', {
            url: '/singleResult/:id',
            templateUrl: '/views/singleResult.html',
            controller: 'singleResultCtrl'
        });
    /* This function ensures returning to homepage on refresh */
}).run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        if(next == current) {
            event.preventDefault();
            $state.transitionTo('home');
        }
    });
}]);
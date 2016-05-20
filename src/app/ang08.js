'use strict';

angular.module('ang08', [
    'ui.router',
    'firebase',
    'ang08.common'])
    .constant('ENDPOINT_URI', 'https://blinding-inferno-1514.firebaseio.com/')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/seriesList');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.tmpl.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .state('seriesList', {
                url: '/seriesList',
                templateUrl: 'app/series/seriesList.tmpl.html',
                controller: 'SeriesCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    'currentUser': ['Auth', function (Auth) {
                        return Auth.$requireAuth();
                    }]
                }
            })
            .state('notes', {
                url: '/series/:seriesId/notes',
                templateUrl: 'app/series/notes/notes.tmpl.html',
                controller: 'NotesCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    'currentUser': ['Auth', function (Auth) {
                        return Auth.$requireAuth();
                    }]
                }
            })
        ;
    })
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            event.preventDefault();
            if (error === 'AUTH_REQUIRED') {
                $state.go('login');
            }
        });
    })
;

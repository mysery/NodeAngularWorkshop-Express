import 'angular-route';

export function routes($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: true,
    });

    $routeProvider
        .otherwise('/')
        .when('/', {
            templateUrl: '/components/app/views/index.html',
            resolve: {
                data: ApiService => ApiService.getBands()
            },
        })
        .when('/band/:bandId/', {
            templateUrl: '/components/app/views/band-detail.html',
            resolve: {
                artists: (ApiService, $route) => ApiService.getArtists($route.current.params.bandId),
                albums: (ApiService, $route) => ApiService.getAlbums($route.current.params.bandId)
            },
        })
        .when('/band/:bandId/album/:albumId/', {
            templateUrl: '/components/app/views/band-detail.html',
            resolve: {
                tracks: (ApiService, $route) => ApiService.getTracks($route.current.params.albumId)
            },
        })
        .when('/band/:bandId/album/:albumId/track/:trackId/', {
            templateUrl: '/components/app/views/band-detail.html',
            resolve: {
                comments: (ApiService, $route) => new ApiService.getComments($route.current.params.trackId)
            },
        });
}

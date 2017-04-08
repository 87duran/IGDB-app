var app = angular.module('igdb');

app.controller('mainCtrl', function($scope, mainService, $location) {

    $scope.description = true;

    $scope.submitSearch = function () {
            mainService.submitRequest($scope.searchTerm)
                .then(function (res) {
                    $location.path('/resultslist');
                    if (res.data === "Not Found") {
                        $scope.notFound = 'Sorry, your search term didn\'t return any results. Please try another search.';
                        $scope.noResult = true;
                        $scope.resultsList = false;
                    } else {
                        $scope.results = res.data;
                        $scope.resultsList = true;
                        $scope.noResult = false;
                        console.log(res.data);
                    }
                    $scope.searchTerm = '';
                    $scope.description = false;
                    $scope.emptyString = true;
                });
    };
});
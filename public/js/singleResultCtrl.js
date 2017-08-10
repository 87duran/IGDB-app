var app = angular.module('igdb');

app.controller('singleResultCtrl', function($scope, mainService, $location, $stateParams) {
    var gameList = mainService.getGameList();   //get list of games from search term API call, which is stored in service

    var getCompany = function(companyId) {    //function for getting company name of a single game
        mainService.getCompany(companyId)
            .then(function(res){
                console.log(res);
                $scope.company = res.data[0].name;
            })
    };

    $scope.gameId = gameList[$stateParams.id].id;   //single out game from list

    $scope.getSingleGameData = function() {             //make API call to get single game data
        mainService.submitSingleRequest($scope.gameId)
            .then(function(res) {
                $scope.resultsList = false;
                $scope.game = res.data[0];
                $scope.companyId = $scope.game.developers[0];
                getCompany($scope.companyId);
                if(!$scope.game.summary && !$scope.game.storyline) {
                    $scope.game.summary = "Sorry, this game is missing a summary."
                }
                var date = new Date($scope.game.first_release_date);
                $scope.releaseDate = date.toLocaleDateString();
                $scope.pageContent = false;
            })
    };
    $scope.getSingleGameData();
});
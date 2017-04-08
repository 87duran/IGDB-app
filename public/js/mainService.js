var app = angular.module('igdb');

app.service('mainService', function($http) {
    var dataHolder = [];                      //This holds list of games from search
    this.submitRequest = function(searchData) {   //This function makes request from user input
        return $http ({
            method: 'POST',
            url: '/getgames',
            data: {searchTerm: searchData}
        }).then(function(res) {
            dataHolder = res.data;
            return res;
        })
    };
    this.getGameList = function() {   //This function is invoked to get ID of specific game for use in function below
        return dataHolder;
    };
    this.submitSingleRequest = function(id) {    //This function gets data for a single game
        return $http ({
            method: 'POST',
            url: '/singlegame',
            data: {id: id}
        }).then(function(res) {
            return res;
        })
    };
    this.getCompany = function(companyId) {    //This function gets company name
        return $http ({
            method: 'POST',
            url: '/company',
            data: {companyId: companyId}
        }).then(function(res) {
            return res;
        })
    }
});
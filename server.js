var express = require('express');
var bodyParser = require('body-parser');
var unirest = require('unirest');
var app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 5000));
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.post('/getgames', function(req, res) {
    if(req.body.searchTerm === undefined || "") {    //check for empty string and send back error to avoid empty API calls
        console.log('Empty String received')
        var errorResponse = "Not Found";
        res.send(errorResponse);
    } else {
        unirest.get("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name,summary,cover,popularity&limit=20&offset=0&order=popularity%3Adesc&search=" + req.body.searchTerm)
            .header("X-Mashape-Key", "abcz9c7ij2mshok2Q3w1ANyBkuAtp1opZinjsnP66BIcy5ouPl")
            .header("Accept", "application/json")
            .end(function (result) {
                console.log(result.status, result.body);
                if (result.body.length === 0) {   //check for empty array meaning no search results
                    result.body = "Not Found";
                    res.send(result.body);
                } else {
                    res.send(result.body);   //send back list of games that match search term
                }
            });
    }
});
app.post('/singlegame', function(req, res) {
    console.log(req.body.id);
    unirest.get("https://igdbcom-internet-game-database-v1.p.mashape.com/games/" + req.body.id + "?fields=*")
        .header("X-Mashape-Key", "abcz9c7ij2mshok2Q3w1ANyBkuAtp1opZinjsnP66BIcy5ouPl")
        .header("Accept", "application/json")
        .end(function (result) {
            console.log(result.status, result.body);
            res.send(result.body);
        });
});

app.post('/company', function(req, res) {
    unirest.get("https://igdbcom-internet-game-database-v1.p.mashape.com/companies/" + req.body.companyId + "?fields=name")
        .header("X-Mashape-Key", "abcz9c7ij2mshok2Q3w1ANyBkuAtp1opZinjsnP66BIcy5ouPl")
        .header("Accept", "application/json")
        .end(function (result) {
            console.log(result.status, result.body);
            res.send(result.body);
        });
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

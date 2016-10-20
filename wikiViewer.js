var request = require('request');
var fs = require('fs');
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

var url = "https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=5&search=";

app.get('/:search', function(req, res){
    var search = req.params.search;
    request(url+search, function(error, response, body){
        var result = JSON.parse(body);
        res.render('wikiIndex.ejs', { result: result});
    });
});

app.get('/:search/save', function(req, res){
    var search = req.params.search;
    request(url + search, function(error, response, body){
        var writable = fs.createWriteStream(__dirname + '/wikiResults.txt');
        var bod = JSON.parse(body);
        for(var i=1; i<5; i++){
            var result = i + ") " + bod[1][i] + ": " + bod[2][i] + " ";
            writable.write(result);
        }
        
        res.send('Your search results have been saved!');
    });
});

app.get('/saved/previous', function(req, res){
    var readStream = fs.createReadStream(__dirname + '/wikiResults.txt');
    readStream.pipe(res);
});

app.listen(8080);

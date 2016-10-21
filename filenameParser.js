var fs = require('fs');
var db = require('./filenameDb.js');
var express = require('express');
var app = express();

function readFiles(dirname, onFileContent, onError){
    fs.readdir(dirname, function(error, files){
        if(error){
            onError(error);
            return;
        }
        var latest = files[files.length-1];
        var fileArr = latest.toString().split("_");       
        onFileContent(fileArr);
    });
} //use readdir to retrieve the latest filename in the directory

var documentObj = {}; //create a document object that contains the MRN, FIN, and doc type
readFiles(__dirname + '/muse', function(fileArr){
    documentObj.MRN = fileArr[0];
    documentObj.FIN = fileArr[1];
    documentObj.DocType = fileArr[2];
}, function(error){
    throw error;
});

app.post('/doc', function (req, res) {
    db.document.create(documentObj).then(function(documentObj){
        console.log(documentObj);
        res.json(documentObj.toJSON());
    }, function(e){
        res.status(400).send();
    });
}); //use the post request to create a row in the database containing the documentObj data
    


db.sequelize.sync().then(function () {
    app.listen(4000);
});


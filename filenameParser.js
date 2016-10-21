var fs = require('fs');
var db = require('./filenameDb.js');
var express = require('express');
var app = express();
var accessible = false;
var documentObj = {}; //create a document object that contains the MRN, FIN, and doc type
function checkAccess(dirname, onAccess){
    fs.access(dirname, fs.R_OK, function(error){
        console.log(error ? 'No access to file': 'Filename parsing enabled');
        if(error){
            console.log(error);
            return;
        }
        var access = true;
        onAccess(access);
    });
}
checkAccess(__dirname + '/muse', function(access){
    accessible = access;
    //console.log(accessible);
    if(accessible === true){
    readFiles(__dirname + '/muse', function(fileArr){
        documentObj.MRN = fileArr[0];
        documentObj.FIN = fileArr[1];
        documentObj.DocType = fileArr[2].replace(/[.txt]/g, "");
        console.log(documentObj);
    }, function(error){
        throw error;
    });
    }
});

//console.log(accessible);

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

app.get('/alldocs', function(req, res){
    db.document.findAll().then(function(docs){
        res.json(docs);
    }, function(e){
        res.status(400).send();
    });
});

app.get('/ptmrn/:mrn/:doctype', function(req, res){
    var mrn = req.params.mrn;
    var doctype = req.params.doctype;
    if(mrn && doctype){
        db.document.findAll({
            where: {
                MRN: mrn,
                DocType: doctype
            }
        }).then(function(docs){
            res.json(docs);
        }, function(e){
            res.status(400).send();
        });
    } else if(mrn && !doctype){
        db.document.findAll({
            where: {
                MRN: mrn
            }
        }).then(function(docs){
            res.json(docs);
        }, function(e){
            res.status(400).send();
        });
    }
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


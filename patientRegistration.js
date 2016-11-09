var db = require('./patientRegDb.js');
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.get('/reg', function(req, res){
    res.sendFile(__dirname + '/views/patientReg.html');
});

app.post('/reg', function(req, res){
    var reqBod = '';
    var patient = {};
    req.on('data', function(chunk){
        reqBod += chunk.toString();
    });
    req.on('end', function(){
        var reqArr = reqBod.split('&');
        //res.send(reqArr);
        reqArr.forEach(function(field){
            var fieldArr = field.split('=');
            patient[fieldArr[0]] = fieldArr[1];
        });
        db.patient.findOrCreate({
            where: {
                firstname: patient.firstname,
                lastname: patient.lastname,
                ssn: patient.ssn,
                birthday: patient.birthday,
                complaint: patient.complaint,
                encounterType: patient.encounterType,
                criticalStatus: patient.criticalStatus,
                fin: 'A'+(Math.random()*1000000000),
                mrn: 'M'+Math.random()*1000000000
            }
        }).then(function(){
            res.send('success');
        });
    });
});

app.get('/search', function(req, res){
    res.sendFile(__dirname+'/views/patientSearch.html');
});

app.post('/search', function(req, res){
    var mySearch = '';
    var ptSearch = {};
    req.on('data', function(chunk){
        mySearch += chunk.toString();
    });
    req.on('end', function(){
        var searchArr = mySearch.split("=");
        ptSearch[searchArr[0]] = searchArr[1];
        db.patient.findOne({
            where: {
                fin: ptSearch.fin
            }
        }).then(function(user){
            //res.render(user);
            res.render("patientUpdateEJS.ejs", {
                firstname: user.firstname,
                lastname: user.lastname,
                ssn: user.ssn,
                birthday: user.birthday,
                complaint: user.complaint,
                encounterType: user.encounterType,
                criticalStatus: criticalStatus
            });
           // res.type("text/html");
            //res.json(user);
        });
    });
});

//app.put('/')

db.sequelize.sync({force: true}).then(function(){
    app.listen(3000);
});

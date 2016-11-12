var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var express = require('express');
var app = express();
var router = express.Router();

router.route('/')
    .get(function(req, res){
        res.sendFile(__dirname+'/views/cities.html');
    });

router.route('/city').post(parseUrlencoded, function(req, res){
        var city = req.body;
        res.status(201).json(city);
    });

app.use('/', router);

app.listen(3000);
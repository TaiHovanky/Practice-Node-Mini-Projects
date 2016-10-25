var timestamp = require('unix-timestamp');
var express = require('express');
var app = express();

app.get('/:str', function (req, res) {
    var str = req.params.str;
    var timeNbr = parseInt(str);
    var resObj = {};
    if(timeNbr == str){
        var isoDate = timestamp.toDate(timeNbr);
        
        var unixDate = Date.parse(isoDate);
        resObj.unix = unixDate;
        var MM = {Jan:"January", Feb:"February", Mar:"March", Apr:"April", May:"May", Jun:"June", Jul:"July", Aug:"August", Sep:"September", Oct:"October", Nov:"November", Dec:"December"}

        var nat = String(new Date(isoDate)).replace(/\w{3} (\w{3}) (\d{2}) (\d{4})/,
        function($0,$1,$2,$3){
            return MM[$1]+" "+$2+", "+$3+" ";
        });

        resObj.natural = nat;
        res.send(resObj);
    } else {
        console.log(str);
        res.send(str);
    }       
    
});


app.listen(3000);
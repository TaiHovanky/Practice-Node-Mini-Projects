var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/dev-healr.sqlite'
});

var db = {};
db.patient = sequelize.import(__dirname + '/models/patient.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;


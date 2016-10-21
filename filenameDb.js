var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/filenameSqlite-database.sqlite'
});

var db = {};
db.document = sequelize.import(__dirname + '/models/documents.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
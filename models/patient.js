module.exports = function(sequelize, DateTypes){
    var patient = sequelize.define('patient', {
        firstname: {
            type: DateTypes.STRING,
        },
        lastname: {
            type: DateTypes.STRING,
        },
        ssn: {
            type: DateTypes.STRING,
        },
        birthday: {
            type: DateTypes.STRING,
        },
        complaint: {
            type: DateTypes.STRING,
        },
        encounterType: {
            type: DateTypes.STRING,
        },
        criticalStatus: {
            type: DateTypes.STRING,
        },
        fin: {
            type: DateTypes.STRING
        },
        mrn: {
            type: DateTypes.STRING
        }
    });
    return patient;
}
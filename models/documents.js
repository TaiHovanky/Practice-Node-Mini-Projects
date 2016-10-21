module.exports = function(sequelize, DataTypes){
    return sequelize.define('document', {
    MRN: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1
        }
    },
    FIN: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1
        }
    },
    DocType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3]
        }
    }
    });
}
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Trans_type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Trans_type.hasMany(models.Trans_cate,
                {
                    foreignKey: 'type_id'
                })
        }
    }
    Trans_type.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Trans_type',
    });
    return Trans_type;
};
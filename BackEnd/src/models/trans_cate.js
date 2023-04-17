'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trans_cate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trans_cate.belongsTo(models.Trans_type,
        {
          foreignKey: 'type_id'
        })
      Trans_cate.hasMany(models.Trans_subcate,
        {
          foreignKey: 'cate_id'
        })
    }
  }
  Trans_cate.init({
    name: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Trans_cate',
  });
  return Trans_cate;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trans_subcate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trans_subcate.belongsTo(models.Trans_cate,
        {
          foreignKey: 'cate_id'
        });
      Trans_subcate.belongsTo(models.User,
        {
          foreignKey: 'user_id'
        })
      Trans_subcate.hasMany(models.Transaction,
        {
          foreignKey: 'subcategory_id'
        })
    }
  }
  Trans_subcate.init({
    name: DataTypes.STRING,
    cate_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trans_subcate',
  });
  return Trans_subcate;
};
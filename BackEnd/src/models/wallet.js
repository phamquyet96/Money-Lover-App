'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.User,
        {
          foreignKey: 'user_id'
        });
      Wallet.hasMany(models.Transaction,
        {
          foreignKey: 'wallet_id'
        })

    }
  }
  Wallet.init({
    name: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    initial_balance: DataTypes.INTEGER,
    include_total: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Transaction.belongsTo(models.Wallet,
        {
          foreignKey: 'wallet_id'
        });
      Transaction.belongsTo(models.Trans_subcate,
        {
          foreignKey: 'subcategory_id'
        })
    }
  }
  Transaction.init({
    money: DataTypes.INTEGER,
    date: DataTypes.DATE,
    note: DataTypes.STRING,
    image: DataTypes.STRING,
    wallet_id: DataTypes.INTEGER,
    subcategory_id: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wallet', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      initial_balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      include_total: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Wallet');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transaction', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      money: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      wallet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Wallet',
          key: 'id'
        }
      },
      subcategory_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Trans_subcate',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transaction');
  }
};
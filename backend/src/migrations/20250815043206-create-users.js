'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      wallet_address: {
        type: Sequelize.STRING(42),
        allowNull: false,
        unique: true
      },
      public_key: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      recovery_threshold: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2
      },
      inactivity_months: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      recovery_status: {
        type: Sequelize.ENUM(
          'active',
          'warning_sent',
          'trustees_notified', 
          'recovery_in_progress',
          'recovered',
          'cancelled'
        ),
        allowNull: false,
        defaultValue: 'active'
      },
      recovery_initiated_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addIndex('users', ['email']);
    await queryInterface.addIndex('users', ['wallet_address']);
    await queryInterface.addIndex('users', ['last_login']);
    await queryInterface.addIndex('users', ['recovery_status']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trustee_access', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      trustee_vault_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      original_vault_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vaults',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      trustee_email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      recovery_key_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      activated_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Add indexes
    await queryInterface.addIndex('trustee_access', ['trustee_vault_id']);
    await queryInterface.addIndex('trustee_access', ['trustee_email']);
    await queryInterface.addIndex('trustee_access', ['original_vault_id']);
    await queryInterface.addIndex('trustee_access', ['is_active']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trustee_access');
  }
};

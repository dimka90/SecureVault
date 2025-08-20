'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('vaults', 'trustee_email', {
      type: Sequelize.STRING,
      allowNull: true, 
      validate: {
        isEmail: true
      }
    });

    await queryInterface.addColumn('vaults', 'recovery_status', {
      type: Sequelize.ENUM(
        'active',       
        'user_inactive',    
        'recovery_initiated', 
        'recovered',     
        'cancelled'     
      ),
      allowNull: false,
      defaultValue: 'active'
    });

    await queryInterface.addColumn('vaults', 'recovery_token', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true // For secure recovery links
    });

    await queryInterface.addColumn('vaults', 'recovery_initiated_at', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('vaults', 'last_trustee_notification', {
      type: Sequelize.DATE,
      allowNull: true 
    });

    await queryInterface.removeColumn('vaults', 'encrypted_aes_key');

    await queryInterface.addIndex('vaults', ['trustee_email']);
    await queryInterface.addIndex('vaults', ['recovery_status']);
    await queryInterface.addIndex('vaults', ['recovery_token']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('vaults', 'trustee_email');
    await queryInterface.removeColumn('vaults', 'recovery_status');
    await queryInterface.removeColumn('vaults', 'recovery_token');
    await queryInterface.removeColumn('vaults', 'recovery_initiated_at');
    await queryInterface.removeColumn('vaults', 'last_trustee_notification');
  }
};
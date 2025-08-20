
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vaults', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      encrypted_secret: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      encrypted_aes_key: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      secret_type: {
        type: Sequelize.ENUM(
          'seed_phrase',
          'password',
          'document',
          'note',
          'private_key',
          'bank_details'
        ),
        allowNull: false,
        defaultValue: 'note'
      },
      ipfs_hash: {
        type: Sequelize.STRING,
        allowNull: true
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      file_size: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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

    // Add indexes
    await queryInterface.addIndex('vaults', ['user_id']);
    await queryInterface.addIndex('vaults', ['secret_type']);
    await queryInterface.addIndex('vaults', ['is_active']);
    await queryInterface.addIndex('vaults', ['created_at']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vaults');
  }
};
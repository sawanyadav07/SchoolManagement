'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('school_memberships', {
      id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true, allowNull: false },
      school_id: {
        type: Sequelize.BIGINT.UNSIGNED, allowNull: false,
        references: { model: 'schools', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'RESTRICT',
      },
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED, allowNull: false,
        references: { model: 'users', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'RESTRICT',
      },
      status: { type: Sequelize.ENUM('invited', 'active', 'suspended'), allowNull: false, defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addConstraint('school_memberships', {
      fields: ['school_id', 'user_id'], type: 'unique', name: 'school_memberships_school_user_unique',
    });
    await queryInterface.addIndex('school_memberships', ['user_id', 'status'], { name: 'school_memberships_user_status_idx' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('school_memberships');
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name:'Tony Stark',
          username: 'ironman',
          password: 'prettyawesome',
          teamId: 1,
        },
        {
          name:'Clark Kent',
          username: 'superman',
          password: `canfly`,
          teamId: 2,
        },
        {
          name:'Bruce Wayne',
          username: 'batman',
          password: 'hasgadgets',
          teamId: 3,
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        'Shares', [{
            id: 1,
            userId: 1,
            fileId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {},
    ),
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Shares', null, {}),
};
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        'Files', [{
            id: 1,
            file: 'cccccc',
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {},
    ),
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Files', null, {}),
};
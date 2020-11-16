module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        'User', [{
            id: 1,
            firstname: 'kella',
            lastname: 'kella',
            email: 'kella@example.com',
            password: '12345678',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {},
    ),
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('User', null, {}),
};
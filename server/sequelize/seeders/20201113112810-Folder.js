module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        'Folders', [{
            id: 1,
            foldername: "myFolder",
            filesId: [1],
            createdAt: new Date(),
            updatedAt: new Date()
        }], {},
    ),
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Folders', null, {}),
};
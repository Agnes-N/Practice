module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Files', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        file: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }),

    down: (queryInterface) => queryInterface.dropTable('Files'),
};
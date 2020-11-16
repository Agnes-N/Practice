module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Folders', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        foldername: {
            type: Sequelize.STRING
        },
        filesId: {
            type: Sequelize.ARRAY(Sequelize.INTEGER)
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

    down: (queryInterface) => queryInterface.dropTable('Folders'),
};
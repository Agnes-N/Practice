export default (sequelize, DataTypes) => {
    const Share = sequelize.define(
        'Shares', {
            userId: DataTypes.INTEGER,
            ShareId: DataTypes.INTEGER
        }, {},
    );
    Share.associate = (models) => {
        Share.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'allUsers',
            onDelete: 'CASCADE',
        });
        Share.belongsTo(models.Files, {
            foreignKey: 'fileId',
            as: 'shares',
            onDelete: 'CASCADE',
        });
    };
    return Share;
};
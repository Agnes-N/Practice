export default (sequelize, DataTypes) => {
    const File = sequelize.define(
        'Files', {
            file: DataTypes.STRING,
            userId: DataTypes.INTEGER
        }, {},
    );
    File.associate = (models) => {
        File.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'allUsers',
            onDelete: 'CASCADE',
        });
        File.hasMany(models.Shares, {
            foreignKey: 'fileId',
            as: 'shares',
            onDelete: 'CASCADE',
        });
    };
    return File;
};
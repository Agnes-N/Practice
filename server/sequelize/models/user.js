export default (sequelize, DataTypes) => {
    const Users = sequelize.define(
        'User', {
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        }, {},
    );
    Users.associate = (models) => {
        Users.hasMany(models.Files, {
            foreignKey: 'userId',
            as: 'files',
            onDelete: 'CASCADE',
        });
        Users.hasMany(models.Shares, {
            foreignKey: 'userId',
            as: 'shares',
            onDelete: 'CASCADE',
        });
    };
    return Users;
};
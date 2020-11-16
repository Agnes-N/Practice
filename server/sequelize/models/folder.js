export default (sequelize, DataTypes) => {
    const Folder = sequelize.define(
        'Folders', {
            foldername: DataTypes.STRING,
            filesId: DataTypes.ARRAY(DataTypes.INTEGER)
        }, {},
    );
    return Folder;
};
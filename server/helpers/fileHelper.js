import models from '../sequelize/models';

class fileHelper {

    static async CreateFile(data) {
        try {
            const { Files } = models;
            const result = await Files.create(data, {
                fields: [
                    'file', 'userId'
                ]
            });
            return result;
        } catch (error) {
            return error;
        }
    }

    static async findExistingFile(column, value) {
        try {
            const { Files } = models;
            const { User } = models;
            const existsFile = await Files.findOne({
                where: {
                    [column]: value
                },
                include: [{
                    model: User,
                    as: 'allUsers'
                }]
            });
            return existsFile;
        } catch (error) {
            return error;
        }
    }

    static async savedSharedFile(data) {
        try {
            const { Shares } = models;
            const result = await Shares.create(data, {
                fields: [
                    'userId', 'fileId'
                ]
            });
            return result;
        } catch (error) {
            return error;
        }
    }

}

export default fileHelper;
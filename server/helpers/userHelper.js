import models from '../sequelize/models';

class UserHelper {

    static async registerUser(data) {
        try {
            const { User } = models;
            const result = await User.create(data, {
                fields: [
                    'firstname', 'lastname', 'email', 'password'
                ]
            });
            return result;
        } catch (error) {
            return error;
        }
    }

    static async findUser(data) {
        try {
            const { User } = models;
            const { Files } = models;
            const user = await User.findOne({ where: data });
            return user;
        } catch (error) {
            return error;
        }
    }
}

export default UserHelper;
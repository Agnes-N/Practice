import UserHelper from '../helpers/userHelper';

class UserController {

    static async retrieveSingleUser(req, res) {
        try {
            const { userId } = req.params;
            const user = await UserHelper.findUser({ id: userId });
            if (user) {
                const { password, ...foundUser } = user.dataValues;

                if (foundUser) {
                    return res.status(200).json({
                        status: 200,
                        data: foundUser
                    });
                }
            }
            res.status(404).json({
                status: 404,
                error: `User with id ${userId} was not found`
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong when retrieving the user',
                error: error.message
            });
        }
    }
}
export default UserController;
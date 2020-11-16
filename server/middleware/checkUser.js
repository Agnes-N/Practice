import UserHelper from '../helpers/userHelper';

class checkUser {

    static async verifyUsedEmail(req, res, next) {
        try {
            const { email } = req.body;
            console.log('==================', req.body);
            const usedEmail = await UserHelper.findUser({ email });
            if (usedEmail === null) {
                next();
            } else {
                res.status(409).send({
                    status: 409,
                    message: 'The specified email is already taken'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong while verifying used email',
                error: error.message
            });
        }
    }
}
export default checkUser;
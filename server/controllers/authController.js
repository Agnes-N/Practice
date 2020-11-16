import passport from 'passport';
import passwordHelper from '../helpers/passwordHelper';
import UserHelper from '../helpers/userHelper';
import TokenHelper from '../helpers/tokenHelper';

class authController {
    static async signUp(req, res) {
        try {
            const {
                firstname,
                lastname,
                email,
                password
            } = req.body;

            const hashedPassword = passwordHelper.hashPassword(password);
            const data = {
                firstname,
                lastname,
                email,
                password: hashedPassword
            };
            const user = await UserHelper.registerUser(data);
            if (user) {
                const token = await TokenHelper.generateToken({
                    id: user.id,
                    email,
                });
                res.status(201).send({
                    token,
                    status: 201,
                    message: 'Account has been created successfully.',
                    data
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong when registering the user',
                error: error.message
            });
        }
    }

    static async signIn(req, res) {
        try {
            passport.authenticate(
                'local', { session: false },
                async(error, user) => {
                    if (error || !user) {
                        return res.status(404).json({ error });
                    }
                    const {
                        id,
                        firstname,
                        lastname,
                        email
                    } = user;

                    const payload = {
                        id,
                        firstname,
                        lastname,
                        email
                    };
                    const token = await TokenHelper.generateToken(payload);

                    req.login(payload, { session: false }, () => res.status(200).json({
                        status: 200,
                        message: 'User signed in successfully',
                        data: {
                            token,
                            user: {
                                firstname,
                                lastname,
                                email
                            }
                        }
                    }));
                },
            )(req, res);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong when signing in',
                error: error.message
            });
        }
    }
}

export default authController;
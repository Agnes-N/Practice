import UserHelper from './userHelper';
import PasswordHelper from './passwordHelper';

class SignInHelper {

    static async userSignIn(email, password, done) {
        try {
            const user = await UserHelper.findUser({ email });
            if (user) {
                const passwordExists = await PasswordHelper.comparePasswords(
                    password,
                    user.password
                );
                if (passwordExists) return done(null, user);
            }
            return done('Password or email is incorrect');
        } catch (error) {
            return error;
        }
    }
}

export default SignInHelper;
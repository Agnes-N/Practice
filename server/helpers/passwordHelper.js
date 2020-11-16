import bcrypt from 'bcrypt';

class PasswordHelper {

    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    static comparePasswords(plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }
}

export default PasswordHelper;
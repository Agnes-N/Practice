import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const { SECRET_KEY } = process.env;

class TokenHelper {

    static async generateToken(data) {
        try {
            const token = await jwt.sign(
                data, SECRET_KEY, { expiresIn: '72h' }
            );
            return token;
        } catch (error) {
            return error;
        }
    }

    static verifyToken(token) {
        try {
            const data = jwt.verify(token, SECRET_KEY);
            return data;
        } catch (err) {
            return err;
        }
    }
}

export default TokenHelper;
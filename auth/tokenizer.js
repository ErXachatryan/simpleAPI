import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET_KEY, JWT_TOKEN_EXP } = process.env;


export default class Tokenizer {

    createToken(payload) {
        return jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn: + JWT_TOKEN_EXP,
        });
    };

    verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;

        if(authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, JWT_SECRET_KEY, {
                expiresIn: + JWT_TOKEN_EXP,
            }, (err, user) => {
                if (err) {
                    return res.status(403).json(err);
                }
                
                req.user = user;
                next();
            });
        } else {
            res.status(401).json(new jwt.JsonWebTokenError('Not authorized for this call'));
        }        
    };
};

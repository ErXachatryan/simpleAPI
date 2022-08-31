import { Router } from 'express';
import { usersController } from '../controllers/index.js';
import dotenv from 'dotenv';
import { tokenizer } from '../auth/index.js';

dotenv.config();

const { JWT_TOKEN_EXP } = process.env;
const router = new Router();

router.post('/signin', async (req, res) => {
    const response = await usersController.post(req.body);

    res.send(response);
});

router.post('/login', async (req, res) => {
    try {
        const user = await usersController.get(req.body);

        if(user) {
            const token = tokenizer.createToken({
                email: user.email,
                nickname: user.nickname,
                uid: user.uid,
            });

            res.send({
                token,
                expire: + JWT_TOKEN_EXP,
            });
        }

        res.status(400).send('Invalid Credentials');
    } catch {

    }
});

export default router;

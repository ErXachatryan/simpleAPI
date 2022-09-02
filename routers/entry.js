import { Router } from 'express';
import { usersController } from '../controllers/index.js';
import dotenv from 'dotenv';
import { tokenizer } from '../auth/index.js';

dotenv.config();

const { JWT_TOKEN_EXP } = process.env;
const router = new Router();

router.post('/signin', async (req, res, next) => {
    try {
        const response = await usersController.post(req.body);

        res.send(response);
    } catch(err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
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
                expire: JWT_TOKEN_EXP,
            });
        }

        res.status(400).send('Invalid Credentials');
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Register a user
 *     description: Register a user using nickname, email, password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test_001test@test.com"
 *               nickname:
 *                 type: string
 *                 example: "myUniqueNickname_"
 *               password:
 *                 type: string
 *                 example: "_VerySecret11pass"
 *             required:
 *               - email
 *               - nickname
 *               - password
 *     responses:
 *       200:
 *         description: JWT token and expiration date.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token generated for the customer.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6Im5pY2tuYW1lMTEiLCJlbWFpbCI6InRlc3QxMUBlbWFpbC5jb20iLCJ1aWQiOiI1NWI3NGY2Zi04MTMzLTQ2NGUtYTM2MC00MTliNjc0OTJmNGYiLCJpYXQiOjE2NjIwNTEzMTYsImV4cCI6MTY2MjA1MzExNn0.tE027fmHH_bb7mSaTMzREQlJjWIQfnLNumUKOfECGxE"
 *                 expire:
 *                   type: string
 *                   description: The amount of seconds the token is valid in.
 *                   example: "1800"
*/

export default router;

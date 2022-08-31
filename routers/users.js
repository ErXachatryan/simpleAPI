import { Router } from 'express';
import { usersController } from '../controllers/index.js';

const router = new Router();

router.get('/', async (req, res, next) => {
    try {
        const user = await usersController.get(req.user);

        res.send({
            email: user.email,
            nickname: user.nickname,
            tags: {
                ...user.tags,
            },
        });
    } catch(err) {
        next(err);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        res.send(await usersController.delete(req.user));
    } catch(err) {
        next(err);
    }
});

router.put('/', async(req, res, next) => {
    try {
        const data = await usersController.put({
            nickname: req.user.nickname,
            newEmail: req.body.email,
            newNickname: req.body.nickname,
            newPassword: req.body.password,
        });
        
        res.send(data);
    } catch(err) {
        next(err)
    }
});

export default router;

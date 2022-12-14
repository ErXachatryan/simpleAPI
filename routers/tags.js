import { Router } from 'express';
import { tagsController } from '../controllers/index.js';

const router = new Router();

router.get('/:id', async (req, res, next) => {
    try {
        const data = await tagsController.get(req.params);

        res.send(data);
    } catch(err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const data = await tagsController.post({
            tag: req.body,
            user: req.user,
        });

        res.send(data);
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = await tagsController.delete({
            tag: req.body,
            user: req.user,
        });

        res.send(data);
    } catch(err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const data = await tagsController.put({
            tagId: req.params.id,
            newTagName: req.query.name,
            newTagOrder: req.body.sortOrder,
            uid: req.user.uid,
            nickname: req.user.nickname
        });

        res.send(data);
    } catch(err) {
        next(err);
    }
});

export default router;

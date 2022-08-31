import { tagsService } from '../services/index.js';

export default class Tags {
    async get(params) {
        const res = await tagsService.get(params);

        if(!res.length) {
            const err = new Error('No such tag found');
            err.statusCode = 404;

            throw err;
        }

        res = res[0];

        return {
            creator: {
                nickname: res.creatornickname,
                uid: res.creator,
            },
            name: res.name,
            sortOrder: res.sortorder,
        };
    };

    async post(params) {
        const res = await tagsService.post(params);

        if(!res.length) {
            throw new Error();
        }

        return {
            ...res[0],
        };
        
    };

    async delete(params) {
        const res = await tagsService.delete(params);

        if(!res.length) {
            const err = new Error('No such tag found in your tags');
            err.statusCode = 404;

            throw err;
        }

        return {
            ...res[0],
        };
    };
    async put(params) {
        const res = await tagsService.put(params);

        if(!res.length) {
            const err = new Error('No such tag found in your tags');
            err.statusCode = 404;

            throw err;
        }

        res = res[0];

        return {
            creator: {
                nickname: params.nickname,
                uid: params.uid
            },
            name: res.name,
            sortOrder: res.sortorder,
        };
    };
}

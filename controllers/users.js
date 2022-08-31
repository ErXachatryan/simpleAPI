import { usersService, tagsService } from '../services/index.js';
import dotenv from 'dotenv';
import { tokenizer } from '../auth/index.js';


dotenv.config();

const { JWT_TOKEN_EXP } = process.env;

export default class Users {
    async get(params) {
        const user = await usersService.get(params);

        if(!user.length) {
            const err = new Error('No such user found');
            err.statusCode = 404;

            throw err;
        }

        const tags = await tagsService.getByCreatorId(user);

        return {
            email: user.email,
            nickname: user.nickname,
            uid: user.uid,
            tags,
        };
    };

    async post(params) {
        const user = await usersService.post(params);

        const token = tokenizer.createToken({
            nickname: params.nickname,
            email: params.email,
            uid: user.uid,
        });

        return {
            token,
            expire: + JWT_TOKEN_EXP,
        };
    };

    async delete(params) {
        const response = await usersService.delete(params);

        if(!response.length) {
            const err = new Error('No such user found');
            err.statusCode = 404;

            throw err;
        }

        return {
            deleted: true,
        };
    };

    async put(params) {
        const response = await usersService.put(params);

        if(!response.length) {
            const err = new Error('No such user found');
            err.statusCode = 404;

            throw err;
        }

        response = response[0]

        return {
            email: response.email,
            password: response.password,
            nickname: response.nickname,
        };
    };
}
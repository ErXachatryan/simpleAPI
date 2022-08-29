export default class Users {
    #pool;

    constructor(pool) {
        this.#pool = pool;
    };

    async get(params) {
        const db = await this.#pool.connect();
        const user = (await db.query(`
            SELECT u.email
                , u.nickname
                , u.uid
            FROM "User" as u
            WHERE u.nickname = '${ params.nickname }';
        `));

        await db.release();

        return user.rows;
    };

    async post(params) {
        const db = await this.#pool.connect();
        const res = await db.query(`
            INSERT INTO "User"(email, password, nickname)
                VALUES('${ params.email }'
                    , '${ params.password }'
                    , '${ params.nickname }'
                ) RETURNING uid;
        `);

        await db.release();

        return {
            ...res.rows[0],
        };
    };

    async delete(params) {
        const db = await this.#pool.connect();
        const res = await db.query(`
            DELETE FROM "User" as u
                WHERE u.nickname = '${ params.nickname }'
            RETURNING *;
        `);

        await db.release();

        return res.rows;
    };
    async put(params) {
        const db = await this.#pool.connect();
        const res = await db.query(`
            UPDATE "User"
                SET email = '${ params.body.email }'
                    , nickname = '${ params.body.nickname }'
                    , password = '${ params.body.password }'
                WHERE nickname = '${ params.user.nickname }'
            RETURNING *;
        `);

        await db.release();

        return res.rows;
    }
}

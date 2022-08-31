export default class Tags {
    #pool;

    constructor(pool) {
        this.#pool = pool;
    };

    async get(params) {
        const db = await this.#pool.connect();
        const res = await db.query(`
            SELECT t.name
                , t.sortOrder
                , t.creator
                , u.nickname as creatorNickname
            FROM "Tag" as t INNER JOIN "User" as u
                ON u.uid = t.creator
            WHERE t.id = '${ params.id }';
        `);

        await db.release()

        return {
            ...res.rows,
        };
    };

    async getByCreatorId(params) {
        const db = await this.#pool.connect();
        const res = await db.query(`
            SELECT t.id
                , t.name
                , t.sortOrder
            FROM "Tag" as t
            WHERE t.creator = '${ params.uid }';
        `);

        await db.release();

        return res.rows;
    }

    async post(params) {
        const db = await this.#pool.connect();
        const res = await db.query(`
            INSERT INTO "Tag"(creator, name, sortOrder)
                VALUES('${ params.user.uid }', '${ params.tag.name }', '${ params.tag.sortOrder ?? 0 }')
            RETURNING id, name, sortOrder;
        `);
        
        await db.release();

        return {
            ...res.rows,
        };
    };

    async delete(params) {
        const db = await this.#pool.connect();
        const res = await db.query(`
            DELETE FROM "Tag" as t
                WHERE t.id = '${ params.tag.id }'
                    AND t.creator = '${ params.user.uid }'
            RETURNING *;
        `);

        await db.release();

        return res.rows;
    };

    async put(params) {
        const db = await this.#pool.connect();
        const res = await db.query(`
            UPDATE "Tag"
                SET name = '${ params.newTagName }'
                , sortOrder = '${ params.newTagOrder ?? 0 }'
            WHERE id = '${ params.tagId }'
                AND creator = '${ params.uid }'
            RETURNING *;
        `);

        await db.release();

        return res.rows;
    };
}

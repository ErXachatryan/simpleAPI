import dbPool from './index.js';

class Scheme {
    #pool;

    constructor(pool) {
        this.#pool = pool;
    };

    async create() {
        return await this.#pool.connect().then(async db => {
            await db.query(`
                CREATE TABLE IF NOT EXISTS "User"(
                    uid uuid DEFAULT gen_random_uuid (),
                    email varchar(100) UNIQUE,
                    password varchar(100),
                    nickname varchar(30) UNIQUE,
                    PRIMARY KEY(uid)
                );
    
                CREATE TABLE IF NOT EXISTS "Tag"(
                    id serial,
                    creator uuid,
                    name varchar(40),
                    sortOrder int DEFAULT 0,
                    PRIMARY KEY(id),
                    CONSTRAINT fk_user
                        FOREIGN KEY(creator)
                            REFERENCES "User"(uid)
                );
            `);
    
            db.release();
        });
    }
}

export default new Scheme(dbPool);

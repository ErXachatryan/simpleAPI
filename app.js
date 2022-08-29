import express from 'express';
import { entryRouter, tagsRouter, usersRouter } from './routers/index.js';
import { tokenizer } from './auth/index.js';
import dbScheme from './database/scheme.js';
import morgan from 'morgan';
import cors from 'cors';

const corsOpt = {
    origin: '*',
};
const app = new express();

dbScheme.create();

app.use(cors(corsOpt));
app.use(morgan('tiny'));
app.use(express.json());
app.use('/', entryRouter);
app.use('/tag', tokenizer.verifyToken, tagsRouter);
app.use('/user', tokenizer.verifyToken, usersRouter);
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal server error',
    });
})

export default app;

import Users from './users.js';
import Tags from './tags.js';
import dbPool from '../database/index.js';

export const usersService = new Users(dbPool);
export const tagsService = new Tags(dbPool);
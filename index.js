import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const { SERVER_PORT: PORT } = process.env;

app.listen(PORT, () => console.log(`Listeting to \'http://localhost:${PORT}\'`));

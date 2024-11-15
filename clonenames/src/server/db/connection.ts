import pgp from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgpInstance = pgp();
const connection = pgpInstance(process.env.DATABASE_URL!);

export default connection;
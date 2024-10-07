import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/to-do',
};

export default dbConfig;
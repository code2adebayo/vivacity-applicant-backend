import dotenv from 'dotenv';
dotenv.config();

const env = {
    POSTGRES: {
        URI: (process.env.POSTGRES_URI as string),
        USER: (process.env.POSTGRES_USER as string),
        PASSWORD: (process.env.POSTGRES_PASSWORD as string),
        HOST: (process.env.POSTGRES_HOST as string),
        PORT: (process.env.POSTGRES_PORT as string),
        DB_NAME: (process.env.POSTGRES_DB_NAME as string),
    }
}

export default env;
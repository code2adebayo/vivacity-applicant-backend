import { Sequelize } from 'sequelize';
import env from '../env';
const { USER, HOST, PASSWORD, PORT, DB_NAME } = env.POSTGRES;

const sequelize = new Sequelize('Vivacity', "postgres", "netry56Jandon", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: true,
    minifyAliases: true,
    pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export const postgres_connection = async () => {
    try {                
        await sequelize.authenticate();
        console.log('Sequelize Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { sequelize }
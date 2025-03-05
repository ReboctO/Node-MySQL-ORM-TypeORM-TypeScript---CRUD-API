import config from '../config.json'; // Ensure you have type definitions or use 'any'
import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import { UserModel } from '../users/user.model';

const db: { User?: any } = {};

initialize();

async function initialize() {
    try {
        // Destructure database config
        const { host, port, user, password, database } = config.database;

        // Create the database if it doesn't exist
        const connection = await mysql.createConnection({ host, port, user, password });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

        // Connect to the database using Sequelize
        const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

        // Initialize models and add them to the db object
        db.User = UserModel(sequelize);

        // Sync all models with the database
        await sequelize.sync({ alter: true });

        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

export default db;

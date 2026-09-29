require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Databasega ulanishni tekshirish
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Modellarni bazaga sinxronlash (jadvallarni yaratish)
        await sequelize.sync({ alter: true });
        console.log('Database models synchronized.');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();

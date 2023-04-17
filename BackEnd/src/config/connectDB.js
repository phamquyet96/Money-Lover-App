const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('money_lover', 'root', '123456', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: true
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection DB has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;
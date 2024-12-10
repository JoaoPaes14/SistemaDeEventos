const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao MySQL com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MySQL:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };

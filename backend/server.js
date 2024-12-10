const express = require('express');
const dotenv = require ('dotenv');
const{connectDB, sequelize}= require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:8081', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

connectDB();

sequelize.sync({ force: false })
  .then(() => {
    console.log('Tabelas sincronizadas com o banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabelas:', error);
  });

//APIS CHAMADO



  const PORT = process.env.PORT || 8088;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
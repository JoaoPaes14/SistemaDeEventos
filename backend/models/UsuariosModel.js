const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuarios = sequelize.define('Usuarios', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4, 
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_usuario: {
        type: DataTypes.ENUM('usuario', 'organizador'),
        allowNull: false,
        defaultValue: 'usuario'
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW 
    },
    updated_data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW 
    }
}, {
    tableName: 'Usuarios',
    timestamps: false 
});

module.exports = Usuarios;

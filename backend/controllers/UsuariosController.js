const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/UsuariosModel');
const { v4: uuidv4 } = require('uuid'); 

// API GET USUARIOS
const getUsuarios = async (req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            const usuario = await Usuarios.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            return res.json(usuario);
        }

        const usuarios = await Usuarios.findAll();
        return res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};

// API CREATE USUARIOS
const createUsuario = async (req, res) => {
    const { Nome, Email, Senha, Tipo_usuario } = req.body;

    try {
       
        const usuarioExistente = await Usuarios.findOne({ where: { Email } });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Email já está em uso.' });
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(Senha, 10);

       
        const novoUsuario = await Usuarios.create({
            id: uuidv4(), 
            Nome,
            Email,
            Senha: hashedPassword,
            Tipo_usuario: Tipo_usuario || 'usuario', // Define tipo de usuário padrão
        });

        return res.status(201).json(novoUsuario); 
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
};

//API LOGIN USUARIO
const loginUsuario = async (req, res) => {
    try {
      const { Email, Senha } = req.body;
  
     
      const usuario = await Usuarios.findOne({ where: { Email } });
  
      if (!usuario) {
        return res.status(400).json({ message: 'Usuário não encontrado!' });
      }
  
     
      const senhaValida = await bcrypt.compare(Senha, usuario.Senha);
      if (!senhaValida) {
        return res.status(400).json({ message: 'Credenciais inválidas!' });
      }
  
      
      const token = jwt.sign(
        { usuarioId: usuario.id, tipoUsuario: usuario.Tipo_usuario },
        'secreta_chave',
        { expiresIn: '1h' } 
      );
  
      
      res.json({
        nome: usuario.Nome,
        tipoUsuario: usuario.Tipo_usuario,
        token: token,
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ message: 'Erro ao fazer login' });
    }
  };

module.exports = {
    getUsuarios,
    createUsuario,
    loginUsuario 

};

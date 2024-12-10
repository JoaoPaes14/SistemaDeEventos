const express = require('express');
const {  getUsuarios, createUsuario, loginUsuario} = require('../controllers/UsuariosController');

const router = express.Router();

router.get('/GetUsuarios', getUsuarios);
router.post('/CreateUsuarios', createUsuario);
router.post('/LoginUsuarios', loginUsuario);

module.exports = router;

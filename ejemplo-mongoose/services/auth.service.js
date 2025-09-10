import Usuario from '../models/Usuario.js';
import { issueAccessToken } from '../helpers/auth.helper.js'

const login = async (data) => {
  try {
    const usuarioValido = await Usuario.findOne({ 
      email: data.email, 
      password: data.password 
    });

    if (!usuarioValido) {
      const error = new Error('Credenciales inválidas');
      error.code = 'AUTH_ERROR';
      throw error;
    }
    
    const token = await issueAccessToken({ 
      sub: usuarioValido._id, 
      role: usuarioValido.role 
    });
    
    return {
      token: token,
      role: usuarioValido.role,
      usuario: {
        id: usuarioValido._id,
        email: usuarioValido.email,
        nombre: usuarioValido.nombre
      }
    };
  } catch (error) {
    if (error.code === 'AUTH_ERROR') {
      throw error;
    }
    throw new Error('Error en el proceso de login: ' + error.message);
  }
}

export { 
  login,
};



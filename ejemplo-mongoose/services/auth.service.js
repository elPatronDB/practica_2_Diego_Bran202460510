import { getDb } from '../configs/mongodb.config.js';
import { issueAccessToken } from '../helpers/auth.helper.js'

const login = async (data) => {
  const db = getDb();
  console.log(data)
  const usuarioValido = await db.collection('usuarios').findOne({email: data.email, password: data.password});

  if (!usuarioValido){
    const error = new Error('AUTH_ERROR');
    error.code = 'AUTH_ERROR';
    throw error;
  }
  
  const token = await issueAccessToken({ sub: usuarioValido._id, role: usuarioValido.role });
  
  return {
    token: token,
    role: usuarioValido.role,
  };
}

export { 
  login,
};



import { responseSuccess, responseError } from '../helpers/response.helper.js';
import joi from 'joi';
import { login } from '../services/auth.service.js'
import { verifyAccessToken } from '../helpers/auth.helper.js'

const schemaAuth = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(1).max(100)
});

const loginHandler = async (req, res) => {
  try{
    const data = req.body;
    
    const { error, values } = schemaAuth.validate(data, { abortEarly: false });

    if(error){
      return res.status(400).json(responseError("Credenciales incorrectas."));
    }

    const result = await login(data);
    
    res.status(200).json(responseSuccess("Login exitoso", result));
  } catch (error) {
    let errorCode = 500;
    let errorMessage = 'INTERNAL_SERVER_ERROR';
    switch(error.code){
      case 'AUTH_ERROR':
        errorCode = 401;
        errorMessage = error.message;
        break;
    }

    return res.status(errorCode).json(responseError(errorMessage));
  }
}

const verifyTokenHandler = () => {
  return async (req, res, next) => {
      try {
        const auth = req.header('Authorization');
        const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
        if (!token) return res.status(401).json({ error: 'Bearer token no enviado' });
  
        await verifyAccessToken(token);
        
        next();
      } catch (err) {
        return res.status(401).json(responseError('Token invalido o expirado'));
      }
    };
}

export { 
  loginHandler,
  verifyTokenHandler
};

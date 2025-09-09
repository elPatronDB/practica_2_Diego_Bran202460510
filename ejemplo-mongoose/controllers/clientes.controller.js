import { responseSuccess, responseError } from '../helpers/response.helper.js';
import joi from 'joi';
import { getClientes, postCliente } from '../services/clientes.service.js'

const schemaCliente = joi.object({
  primerNombre: joi.string().min(5).max(50).required(),
  segundoNombre: joi.string().optional(),
  primerApellido: joi.string().min(5).max(50).required(),
  segundoApellido: joi.string().optional(),
  nit: joi.string().required(),
  email: joi.string().email().required(),
  direcciones: joi.array().required(),
  telefonos: joi.array().required()
});

//Handler para el metodo get de todos los clientes
const getClientesHandler = async (req, res) => {
  try{
    const clientes = getClientes();

    res.status(200).json(responseSuccess("Clientes obtenidos exitosamente",clientes));
  } catch (error) {
    let errorCode = 500;
    let errorMessage = 'INTERNAL_SERVER_ERROR';
    switch(error.code){
      case 'DATA_NOT_FOUND':
        errorCode = 404;
        errorMessage = error.code;
        break;
    }

    return res.status(errorCode).json({
      message: errorMessage
    });
  }
}

const postClienteHandler = async (req, res) => {
  try{
    const data = req.body;
    const { error, valueData } = schemaCliente.validate(data, { abortEarly: false });

    if(error){
      return res.status(400).json(responseError(error.details.map(e => e.message)));
    }

    const clienteId = postCliente(valueData);
    
    res.status(201).json(responseSuccess("cliente guardado", clienteId));

  } catch (error) {
    let errorCode = 500;
    let errorMessage = 'INTERNAL_SERVER_ERROR';
    switch(error.code){
      case 'DATA_EXISTS':
        errorCode = 409;
        errorMessage = error.code;
        break;
    }

    return res.status(errorCode).json({
      message: errorMessage
    });
  }
}

export { 
  getClientesHandler,
  postClienteHandler
};

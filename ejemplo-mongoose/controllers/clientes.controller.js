import { responseSuccess, responseError } from '../helpers/response.helper.js';
import mongoose from 'mongoose';
import { getClientes, postCliente } from '../services/clientes.service.js'


const { schemaClient } = mongoose; // Nota: mongoose tiene un objeto llamado Schema

// Definición de un nuevo esquema
const newSchema = mongoose;

// Esquema del Cliente con Destructuring
const { schemaCliente } = newSchema  ({
  primerNombre: String,
  segundoNombre: String,
  primerApellido: String,
  segundoApellido: String,
  nit: String,
  email: String,
  direcciones: Array,
  telefonos: Array
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

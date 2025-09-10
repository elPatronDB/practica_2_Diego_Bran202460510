import { responseSuccess, responseError } from '../helpers/response.helper.js';
import mongoose from 'mongoose';
import { getClientes, postCliente } from '../services/clientes.service.js'


const { Schema } = mongoose; // Nota: mongoose tiene un objeto llamado Schema

// Definición del esquema del Cliente
const schemaCliente = new Schema({
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
    const clientes = await getClientes();

    res.status(200).json(responseSuccess("Clientes obtenidos exitosamente", clientes));
  } catch (error) {
    let errorCode = 500;
    let errorMessage = 'INTERNAL_SERVER_ERROR';
    switch(error.code){
      case 'DATA_NOT_FOUND':
        errorCode = 404;
        errorMessage = error.message;
        break;
    }

    return res.status(errorCode).json(responseError(errorMessage));
  }
}

const postClienteHandler = async (req, res) => {
  try{
    const data = req.body;
    
    // Validación básica de campos requeridos
    if (!data.primerNombre || !data.primerApellido || !data.email) {
      return res.status(400).json(responseError("Los campos primerNombre, primerApellido y email son requeridos"));
    }

    const clienteId = await postCliente(data);
    
    res.status(201).json(responseSuccess("Cliente guardado exitosamente", { id: clienteId }));

  } catch (error) {
    let errorCode = 500;
    let errorMessage = 'INTERNAL_SERVER_ERROR';
    switch(error.code){
      case 'DATA_EXISTS':
        errorCode = 409;
        errorMessage = error.message;
        break;
      case 'VALIDATION_ERROR':
        errorCode = 400;
        errorMessage = error.message;
        break;
    }

    return res.status(errorCode).json(responseError(errorMessage));
  }
}

export { 
  getClientesHandler,
  postClienteHandler
};

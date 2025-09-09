import { getDb } from '../configs/mongodb.config.js';

const getClientes = async () => {
  const db = getDb();
  const clientes = await db.collection('clientes').find().toArray();
  
  if (!clientes){
    const error = new Error('DATA_NOT_FOUND');
    error.code('DATA_NOT_FOUND');
    throw error;
  }

  return clientes;
}

const postCliente = async (data) => {
  const db = getDb();

  const cliente = await db.collection('clientes').findOne({nit: data.nit});

  if (cliente){
    const error = new Error('AUTH_ERROR');
    error.code = 'AUTH_ERROR';
    throw error;
  }
  
  const nuevoCliente = await db.collection('clientes').insertOne(data);
  
  return nuevoCliente.insertedId;
}

export { 
  getClientes,
  postCliente
};



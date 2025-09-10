import Cliente from '../models/Cliente.js';

const getClientes = async () => {
  try {
    const clientes = await Cliente.find();
    
    if (!clientes || clientes.length === 0) {
      const error = new Error('No se encontraron clientes');
      error.code = 'DATA_NOT_FOUND';
      throw error;
    }

    return clientes;
  } catch (error) {
    if (error.code === 'DATA_NOT_FOUND') {
      throw error;
    }
    throw new Error('Error al obtener clientes: ' + error.message);
  }
}

const postCliente = async (data) => {
  try {
    // Verificar si ya existe un cliente con el mismo NIT
    const clienteExistente = await Cliente.findOne({ nit: data.nit });
    
    if (clienteExistente) {
      const error = new Error('Ya existe un cliente con este NIT');
      error.code = 'DATA_EXISTS';
      throw error;
    }

    // Verificar si ya existe un cliente con el mismo email
    const emailExistente = await Cliente.findOne({ email: data.email });
    
    if (emailExistente) {
      const error = new Error('Ya existe un cliente con este email');
      error.code = 'DATA_EXISTS';
      throw error;
    }
    
    const nuevoCliente = new Cliente(data);
    const clienteGuardado = await nuevoCliente.save();
    
    return clienteGuardado._id;
  } catch (error) {
    if (error.code === 'DATA_EXISTS') {
      throw error;
    }
    if (error.name === 'ValidationError') {
      const error = new Error('Datos de cliente inválidos: ' + Object.values(error.errors).map(e => e.message).join(', '));
      error.code = 'VALIDATION_ERROR';
      throw error;
    }
    throw new Error('Error al crear cliente: ' + error.message);
  }
}

export { 
  getClientes,
  postCliente
};



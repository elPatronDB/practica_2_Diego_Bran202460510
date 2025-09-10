import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  primerNombre: {
    type: String,
    required: true,
    trim: true
  },
  segundoNombre: {
    type: String,
    trim: true
  },
  primerApellido: {
    type: String,
    required: true,
    trim: true
  },
  segundoApellido: {
    type: String,
    trim: true
  },
  nit: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  direcciones: [{
    type: String,
    trim: true
  }],
  telefonos: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;

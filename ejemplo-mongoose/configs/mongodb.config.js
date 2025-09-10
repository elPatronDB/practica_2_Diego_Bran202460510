import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoDb = process.env.MONGO_DB || 'ejemplo_mongoose';
const mongoUser = process.env.MONGO_DB_USER || '';
const mongoPassword = process.env.MONGO_DB_PASSWORD || '';

// Construir URL de conexión
let mongoUrl;
if (mongoUser && mongoPassword) {
  mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDb}?authSource=admin`;
} else {
  mongoUrl = `mongodb://${mongoHost}:${mongoPort}/${mongoDb}`;
}

export const connectToMongo = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Ya conectado a MongoDB");
      return;
    }

    await mongoose.connect(mongoUrl);
    console.log("Conectado a la base de datos MongoDB con Mongoose");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
}

export const disconnectFromMongo = async () => {
  try {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  } catch (error) {
    console.error("Error al desconectar de MongoDB:", error);
  }
}


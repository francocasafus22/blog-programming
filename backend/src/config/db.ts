import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Base de datos conectada...");
  } catch (error) {
    console.log(`Erro al conectar a la DB: ${error.message}`);

    process.exit(1);
  }
};

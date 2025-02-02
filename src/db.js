import mongoose from "mongoose";

// URL de conexión
const uri =
  "mongodb+srv://sandra:sandrapass@cluster0.omi7j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  
export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Conectado a la bbdd");
  } catch (error) {
    console.log("Error al conectar con MongoDB Atlas:", error.message);
  }
};

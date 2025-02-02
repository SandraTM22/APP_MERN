import mongoose from "mongoose";

//Definimos el "objeto" que queremos validar
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Lo hacemos asi para poder interactuar con la bbdd, con los metodos
export default mongoose.model("User", userSchema);

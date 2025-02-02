import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required : true,
    },
    description: {
      type: String,
      required : true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user:{
        // Relacion con el modelo User
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
  },
  {
    Timestamp: true,
  }
);

export default mongoose.model("Task", taskSchema);

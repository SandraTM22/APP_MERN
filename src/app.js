import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import tasksRouter from "./routes/tasks.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//Objeto de express que es el Servidor
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//todas las rutas de authRoutes empiecen con /api
app.use("/api", authRoutes);
app.use("/api", tasksRouter);
app.listen(4400, () => {
  console.log("🔥 Servidor corriendo en http://localhost:4400");
});

export default app;

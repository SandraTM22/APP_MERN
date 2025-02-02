import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = async (req, res, next) => {
  const { token } = req.cookies;

  //Si no existe el token
  if (!token) {
    return res.status(401).json({ message: "No token, autorización denegada" });
  }

  //Verificamos el token
  jwt.verify(token, TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(401).json({ message: "Token no válido" });
    }

    //Guardamos el usuario en req.user
    req.user = user;

    next();
  });
};

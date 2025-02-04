import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  try {
    //debugging
    console.log("🔥 Datos recibidos en backend:", req.body);

    const { username, email, password } = req.body;
    //look for the user in the db
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({
        message: ["Este email ya está en uso"],
      });

    //To hash the password
    const paswordHash = await bcrypt.hash(password, 10);

    //To create the user
    const newUser = new User({
      username,
      email,
      password: paswordHash,
    });

    //To save the user in the database
    const userSaved = await newUser.save();

    //To create access token
    const token = await createAccessToken({ id: userSaved.id });

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      //httpOnly: false,
    });

    //Datos que vamos a mostrar en el Front
    res.json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //To find the user in the database
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    //to compare the password
    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    //Creamos Token para sesion
    const token = await createAccessToken({ id: userFound.id });

    //Guardamos el token en una cookie
    res.cookie("token", token);

    //Datos que vamos a mostrar en el Front
    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  //Si no existe la cookie
  if (!token) return res.status(401).json({ message: "no autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "no autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });
    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const logout = async (req, res) => {
  try {
    //Limpiamos la cookie
    res.clearCookie("token");
    res.json({ message: "Logout exitoso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

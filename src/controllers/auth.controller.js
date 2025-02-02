import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  //debugging
  console.log("🔥 Datos recibidos en backend:", req.body);
  const { username, email, password } = req.body;

  try {
    //look for the user in the db
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["El email ya está registrado"]);

    //Para encriptar la contrasña
    const paswordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: paswordHash,
    });
    //para guardar en la bbdd
    const userSaved = await newUser.save();

    //Creamos Token para sesion
    const token = await createAccessToken({ id: userSaved.id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: false,
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
  const { email, password } = req.body;

  try {
    //Buscamos el usuario en la bbdd
    const userFound = await User.findOne({ email });

    //Si no existe el usuario
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    //Comparamos la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);

    //Si la contraseña no es correcta
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

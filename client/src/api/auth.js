import axios from "./axios";
import Cookies from "js-cookie";

//to connect to the backend, we need to make a POST request to the /register path
export const registerRequest = async (user) => {
  try {
    // wait for the response of the POST request
    const response = await axios.post(`/register`, user);
    return response; // return the response to use it in AuthContext
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error; // throw the error so that it is handled in AuthContext
  }
};

//to connect to the backend, we need to make a POST request to the /login path
export const loginRequest = async (user) => {
  try {
    // wait for the response of the POST request
    const response = await axios.post(`/login`, user);
    return response; // return the response to use it in AuthContext
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error; // throw the error so that it is handled in AuthContext
  }
};

export const verifyTokenRequest = async () => {
  const token = Cookies.get('token'); // Obtén el token de las cookies
  if (!token) {
    throw new Error("Token no encontrado");
  }

  return axios.get("/verify", {
    headers: {
      Authorization: `Bearer ${token}`  // Incluye el token en las cabeceras
    }
  });
};


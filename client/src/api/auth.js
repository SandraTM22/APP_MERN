import axios from "./axios";

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
export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);



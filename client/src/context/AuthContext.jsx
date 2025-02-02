/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

// For providing the context to the children components
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  //const [loading, setLoading] = useState(true);

  //collect the data of the form to have it in the context
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
        setErrors([]); // Limpiar errores si el registro es exitoso
      }
    } catch (error) {
      //console.log(error.response.data);

      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data); // If the backend sends an array, save it directly
      } else {
        setErrors([error.response.data.message || "Error desconocido"]); // Convert to array if it is a string
      }
    }
  };

  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUser(res.data);
      //console.log(res);
    } catch (error) {
      //console.log(error.response.data);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data); // If the backend sends an array, save it directly
      } else {
        setErrors([error.response.data.message || "Error desconocido"]); // Convert to array if it is a string
      }
    }
  };

  //If there are errors, delete them after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      console.log("Cookies:", cookies); //verificamos cookies

      //if there is no cookie, deny
      if (!cookies.token) {
        setIsAuthenticated(false);
        //setLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log("Respuesta de verificación:", res); // Verifica la respuesta del servidor

        //if there is no data, deny
        if (!res.data) {
          setIsAuthenticated(false);
          return;
        }
        setIsAuthenticated(true);
        console.log("datos de la respuesta ", res.data);
        setUser(res.data);
        //setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        console.log("Error al verificar el token:", error); // Verifica el error
        //setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    // all components inside will be able to access the data singup and user
    <AuthContext.Provider
      value={{
        user,
        signup,
        isAuthenticated,
        errors,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

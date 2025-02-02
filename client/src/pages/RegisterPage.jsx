import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center bg-teal-100  p-10 rounded-md">
      <div className="bg-teal-800 max-w-md p-10 rounded-md">
        {registerErrors.map((error, index) => (
          <div
            key={index}
            className="bg-red-800 rounded-md m-1 p-2 text-white text-center"
          >
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold text-white text-ce">Registro</h1>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("username", { required: true }, { minLength: 3 })}
            placeholder="Introduce nombre de usuario..."
            className="appearance-none bg-transparent border-none w-full text-white font-bold m-2 py-1 px-2 leading-tight "
          />
          {errors.username && (
            <p className="text-red-500  ml-2"> El nombre es requerido</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Introduce email..."
            className="appearance-none bg-transparent border-none w-full text-white font-bold m-2 py-1 px-2 leading-tight focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500  ml-2"> El email es requerido</p>
          )}
          <input
            type="password"
            {...register("password", { required: true }, { minLength: 6 })}
            placeholder="******"
            className="appearance-none bg-transparent border-none w-full text-white font-bold m-2 py-1 px-2 leading-tight "
          />
          {errors.password && (
            <p className="text-red-500 ml-2"> La contraseña es requerida</p>
          )}

          <button
            type="submit"
            className=" bg-teal-500 hover:bg-teal-200 border-teal-500 hover:border-teal-700 text-sm border-4 text-white hover:text-teal-900 hover:font-bold py-1 px-2 rounded ml-2 font-bold"
          >
            Registrarse
          </button>
        </form>
        <p className="text-white mt-8 text-center">
          ¿Ya tienes cuenta? Inicia sesión{" "}
          <Link to="/login">
            <b>aquí</b>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

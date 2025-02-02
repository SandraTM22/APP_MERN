import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate  } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  useEffect(() => {
      if (isAuthenticated) {
        navigate("/tasks");
      }
    }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center bg-teal-100  p-10 rounded-md">
      <div className="bg-teal-800 max-w-md p-10 rounded-md">
        {loginErrors.map((error, index) => (
          <div key={index} className="bg-red-800 rounded-md m-1 p-2 text-white text-center">
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold text-white text-ce">Login</h1>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
            Entrar
          </button>
        </form>

        <p className="text-white mt-8 text-center">¿No tienes cuenta? Registrate  <Link to="/register"><b>aquí</b></Link></p>
      </div>
    </div>
  );
}

export default LoginPage;

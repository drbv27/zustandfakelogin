import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //necesitamos obtener de zustand las acciones y los estados
  const login = useAuthStore((state) => state.login); //lo mas normal es usar .getState()
  const loading = useAuthStore((state) => state.loading);
  const authError = useAuthStore((state) => state.error);
  const user = useAuthStore((state) => state.user);

  const onSubmit = (data) => {
    login(data.username);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2 className="text-xl text-center font-semibold text-blue-800">
        Iniciar sesion
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Nombre de usuario:</label>
          <input
            className="border border-slate-300 rounded-lg ml-1"
            type="text"
            placeholder="Ejemplo Bret"
            {...register("username", {
              required: "el nombre de usuario es requerido",
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-800 text-white font-semibold px-2 rounded-lg"
        >
          {loading ? "Cargando" : "Enviar"}
        </button>
      </form>
      {authError && <p>Error: {authError}</p>}
    </div>
  );
};

export default LoginPage;

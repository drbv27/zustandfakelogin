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

  return (
    <div>
      <h2>Iniciar sesion</h2>
      <form>
        <div>
          <label htmlFor="">Nombre de usuario:</label>
          <input
            type="text"
            placeholder="Ejemplo Bret"
            {...register("username", {
              required: "el nombre de usuario es requerido",
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <button type="submit">{loading ? "Cargando" : "Enviar"}</button>
      </form>
    </div>
  );
};

export default LoginPage;

import { useAuthStore } from "../store/authStore";

const HomePage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  return (
    <div>
      <h1>Bienvenido, {user?.name}</h1>
      <p>
        has iniciado sesion con el correo:{" "}
        <span className="text-slate-600 font-semibold">"{user?.email}"</span>
      </p>
      <button
        className="bg-red-800 text-white px-2 rounded cursor-pointer hover:bg-red-700"
        onClick={logout}
      >
        cerrar sesion
      </button>
    </div>
  );
};

export default HomePage;

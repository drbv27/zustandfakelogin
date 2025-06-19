import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useAuthStore = create(
  persist((set) => ({
    //TODO: ENSEÑAR EL MIDDLEWARE PARA LA PERSISNTECIA
    //export const useNombreStore = create((set)=>({estados,acciones}))
    //Estado o estados
    user: null, //almacenara los datos del usuario si el login es exitoso
    loading: false, //para mostrar un indicador de carga durante el login
    error: null, //Para mostrar un error si el login falla
    //Acciones
    login: async (username) => {
      //1.Poner el estado en 'cargando' y limpiar errores
      set({ loading: true, error: null });
      try {
        //2.consultar a la API de JSON Placeholder la lista de usuarios
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("No se pudo conectar a la API");
        }
        const users = await response.json();
        //3.Buscamos si algun username de los usuarios coincide con el que digite
        const foundUser = users.find(
          (user) => user.username.toLowerCase() === username.toLowerCase()
        );
        if (foundUser) {
          //4.Si el usuario existe lo guardamos en el estado
          set({ user: foundUser, loading: false });
        } else {
          //5. si el usuario no existe lanzamos un eror
          throw new Error("Usuario no encontrado");
        }
      } catch (error) {
        //6. si algo falla lo guardamos en el estado como un error
        set({ error: error.message, loading: false });
      }
    },
    logout: () => {
      set({ user: null });
    },
  }))
);

/* eslint-disable no-useless-catch */
import { createContext, useContext, useState, useEffect } from "react";

const VITE_BACKEND_AUTH= import.meta.env.VITE_BACKEND_AUTH;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Recuperar el usuario de localStorage al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Iniciar sesión
  const login = async (credentials) => {
    try {
      const response = await fetch(`${VITE_BACKEND_AUTH}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el inicio de sesión");
      }
  
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };
  
  const register = async (credentials) => {
    try {
      const response = await fetch(`${VITE_BACKEND_AUTH}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el registro");
      }
  
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Error en register:", error);
      throw error;
    }
  };
  

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      localStorage.removeItem("user"); // Eliminar el usuario de localStorage
    } catch (error) {
      console.error("Error cerrando sesión", error);
    }
  };

  const value ={
    user,
    login,
    logout,
    register
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("El context no esta envolviendo");
    }
    return context;

}
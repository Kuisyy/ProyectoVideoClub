import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const VITE_BACKEND_AUTH= import.meta.env.VITE_BACKEND_AUTH;


const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Inicializa como null para el estado de carga
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_AUTH}/check`, {
          method: "GET",
          credentials: "include", // Asegúrate de enviar las cookies
        });

        if (response.ok) {
          setIsAuthenticated(true); // Si el usuario está autenticado
        } else {
          setIsAuthenticated(false); // Si el usuario no está autenticado
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Una vez terminada la solicitud, ya no estamos cargando
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    <div className="flex justify-center items-center min-h-screen">
        <PacmanLoader color="#e3ff00" margin={10} />
    </div>  
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

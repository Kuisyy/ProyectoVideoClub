import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/paths";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(credentials);
      navigate(ROUTES.HOME);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg mb-3"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg mb-3"
            required
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg">
            Iniciar Sesión
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-3">
          ¿No tienes cuenta?{" "}
          <a href={ROUTES.REGISTER} className="text-blue-400 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

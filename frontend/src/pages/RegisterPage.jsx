import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/paths";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(credentials);
      navigate(ROUTES.HOME);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white text-center">Registro</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={credentials.name}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg mb-3"
            required
          />
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
          <button className="w-full bg-sky-600 hover:bg-sky-700 text-white p-3 rounded-lg">
            Registrarse
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-3">
          ¿Ya tienes cuenta?{" "}
          <a href={ROUTES.LOGIN} className="text-blue-400 hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js"; // Corregido el nombre
import { fetchAndStoreMovies } from "./services/tmdb.js"; // Importamos la función para traer películas

// Cargamos las variables de entorno
dotenv.config();
// Creamos la app
const app = express();

// Middlewares
const corsOptions = {
  origin: ['http://localhost', 'http://localhost:80'], // Agregar ambas opciones
  credentials: true,
};





app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Algo ha ido mal" });
});

const PORT = process.env.PORT || 3000;

connectDB().then(async () => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });

  // Llamamos a la función para obtener y guardar películas
  await fetchAndStoreMovies();
});

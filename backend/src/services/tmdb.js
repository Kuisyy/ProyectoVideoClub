import { Movie } from "../models/Movie.js"; // Usamos el modelo Movie con schema completo
const API_TOKEN = process.env.VITE_API_TOKEN; // API Token de TMDb
const VITE_API_URL = process.env.VITE_API_URL; // URL de la API de TMDb

// Función para hacer fetch a la API de TMDb con paginación
const fetchFromApi = async (endpoint, page = 1, options = {}) => {
  try {
    const url = `${VITE_API_URL}${endpoint}?api_key=${API_TOKEN}&language=es-ES&page=${page}&${new URLSearchParams(options)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error en fetchFromApi: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error fetching data from TMDb");
  }
};

// Función para obtener y almacenar películas en la base de datos local (MongoDB)
export const fetchAndStoreMovies = async (page = 1) => {
  try {
    const data = await fetchFromApi("movie/popular", page); // Obtener películas populares desde TMDb

    if (!data || !data.results) {
      console.log(`No results found for page ${page}`);
      return;
    }

    // Crear el formato adecuado para la base de datos MongoDB usando el schema completo
    const moviesToSave = data.results.map((movie) => ({
      tmdbId: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      genres: movie.genre_ids,
      rating: movie.vote_average,
      reviews: [] // Comenzamos con un array vacío para reseñas, esto se puede actualizar después
    }));

    // Verificar si las películas ya existen antes de insertarlas
    for (const movie of moviesToSave) {
      const existingMovie = await Movie.findOne({ tmdbId: movie.tmdbId });

      if (!existingMovie) {
        // Crear una nueva película usando el schema de Movie
        const newMovie = new Movie(movie);
        await newMovie.save();
      } else {
        console.log(`Movie ${movie.title} already exists, skipping.`);
      }
    }

    console.log(`Page ${page} processed!`);
  } catch (error) {
    console.error("Error fetching and storing movies:", error);
  }
};

// Función para cargar todas las películas al arrancar el servidor
const loadAllMovies = async () => {
  try {
    console.log("Starting movie loading process...");
    for (let page = 1; page <= 50; page++) {
      console.log(`Loading page ${page}...`);
      await fetchAndStoreMovies(page); // Cargar y almacenar películas de cada página
    }
    console.log("All movies have been loaded into the database!");
  } catch (error) {
    console.error("Error during initial movie loading:", error);
  }
};

// Ejecutar la carga de películas al iniciar el servidor
loadAllMovies();

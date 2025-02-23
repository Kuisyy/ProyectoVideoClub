import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getMovieFromBackend } from "../services/tmdb";
import { PacmanLoader } from "react-spinners";

const MovieDetail = () => {
  const { id } = useParams();  // Aquí obtenemos el parámetro 'id' de la URL

  const { data, loading, error } = useFetch(() => getMovieFromBackend(id), [id]);

  // Mapeo directo de los géneros
  const genreMap = {
    "28": "Acción",
    "12": "Aventura",
    "16": "Animación",
    "35": "Comedia",
    "80": "Crimen",
    "99": "Documental",
    "18": "Drama",
    "10751": "Familiar",
    "14": "Fantasía",
    "36": "Historia",
    "27": "Terror",
    "10402": "Música",
    "9648": "Misterio",
    "10749": "Romántico",
    "878": "Ciencia ficción",
    "10770": "Película de TV",
    "53": "Suspenso",
    "10752": "Bélica",
    "37": "Western"
  };

  // Función para mapear los géneros
  const getGenresFromIds = (genreIds) => {
    return genreIds.map(id => genreMap[id] || "Desconocido");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color="#e3ff00" margin={10} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10">
        <h2 className="text-red-600 font-bold text-2xl">Error</h2>
        <p className="text-xl font-medium">{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-10">
        <h2 className="text-gray-600 text-2xl">No se encontraron detalles para esta película.</h2>
      </div>
    );
  }

  // Mapear los géneros usando la función
  const genres = getGenresFromIds(data.genres);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Contenedor de la película */}
      <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
        {/* Imagen de la película */}
        <div className="flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
            alt={data.title}
            className="rounded-lg shadow-lg"
            style={{ width: "300px", height: "450px", objectFit: "cover" }}
          />
        </div>

        {/* Detalles de la película */}
        <div className="flex flex-col space-y-4 md:max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
          <p className="text-lg text-gray-700">{data.overview}</p>
          <div className="flex flex-wrap gap-4">
            <p className="text-gray-600"><strong>Fecha de lanzamiento:</strong> {data.releaseDate}</p>
            <p className="text-gray-600"><strong>Calificación:</strong> {data.rating}</p>
            <p className="text-gray-600">
              <strong>Géneros:</strong> {genres.join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Botón para volver */}
      <div className="text-center mt-8">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;

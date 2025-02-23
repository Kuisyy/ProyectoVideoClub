import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // Mapeo de géneros
  const genreMapping = {
    "10749": "Romance",
    "878": "Ciencia ficción",
    "53": "Suspenso",
    "12": "Aventura",
    "10751": "Familiar",
    "16": "Animación",
    "28": "Acción",
    "80": "Crimen",
    "18": "Drama",
    "35": "Comedia",
    "27": "Terror",
    "10752": "Guerra"
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <Link to={`/movie/${movie._id}`}>
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} // Concatenación de URL base
          alt={movie.title}
          className="w-full h-[400px] object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{movie.title}</h3>
        <p className="text-gray-600 text-sm">⭐ {movie.rating.toFixed(1)}</p> {/* Puntuación */}
        <p className="text-gray-600 text-sm">
          Género: {movie.genres.map(genreId => genreMapping[genreId] || "Desconocido").join(', ')} {/* Mapeo de géneros */}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { useFetch } from "../hooks/useFetch";
import { getMoviesFromBackend } from "../services/tmdb";
import { PacmanLoader } from "react-spinners";

const MovieList = () => {
  // Estado para el número de página
  const [page, setPage] = useState(1);

  // Hook para traer las películas populares
  const { data, loading } = useFetch(() => getMoviesFromBackend(page), [page]);

  // Manejadores de paginación
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };


  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-sky-950 text-4xl font-bold">
          Bienvenido a Movie App
        </h1>
        <p className="mt-2 text-gray-600">
          La mejor aplicación para buscar películas y leer reseñas de cine
        </p>
      </header>

      {/* Películas Populares */}
      <section>
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-2xl font-bold">Películas Populares</h2>
        </div>

        {/* Si estamos cargando, mostramos el spinner */}
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <PacmanLoader color="#e3ff00" margin={10} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* Paginación */}
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`px-4 py-2 rounded bg-blue-500 text-white font-bold transition ${
              page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            Anterior
          </button>

          <span className="text-lg font-semibold">Página {page}</span>

          <button
            onClick={handleNextPage}
            className="px-4 py-2 rounded bg-blue-500 text-white font-bold transition hover:bg-blue-600"
          >
            Siguiente
          </button>
        </div>
      </section>
    </div>
  );
};

export default MovieList;

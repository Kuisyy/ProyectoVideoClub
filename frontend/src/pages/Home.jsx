import { useState } from "react";
import { getMoviesFromBackend } from "../services/tmdb"; 
import MovieCard from "../components/MovieCard";
import { PacmanLoader } from "react-spinners";
import { useFetch } from "../hooks/useFetch"; 
import { Link } from "react-router-dom";

const Home = () => {
  const [page, setPage] = useState(1);

  // Aquí usas la función de tmdb.js para obtener las películas populares
  const { data, loading, error } = useFetch(() => getMoviesFromBackend(page), [page]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  // Manejar cuando 'data' esté vacío o no haya información disponible
  if (error) {
    return (
      <div className="text-center p-10">
        <h2 className="text-red-600 font-bold text-2xl">Error</h2>
        <p className="text-xl font-medium">{error.message}</p>
        <Link to="/" className="text-blue-600">Volver al inicio</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PacmanLoader color="#e3ff00" margin={10} />
      </div>
    );
  }

  // Verificar si 'data' está disponible
  if (!data) {
    return (
      <div className="text-center p-10">
        <h2 className="text-red-600 font-bold text-2xl">No se encontraron resultados</h2>
        <Link to="/" className="text-blue-600">Volver al inicio</Link>
      </div>
    );
  }

  // Si data es un arreglo de películas, las mostramos en una lista
  if (Array.isArray(data)) {
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

        <section>
          <div className="flex justify-between items-center mt-4">
            <h2 className="text-2xl font-bold">Películas Populares</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

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
  }

  // Si 'data' no es un arreglo, mostramos solo una película
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

      <section>
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-2xl font-bold">Película</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <MovieCard key={data.id} movie={data} />
        </div>

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

export default Home;

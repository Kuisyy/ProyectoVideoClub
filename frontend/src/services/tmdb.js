// api.js

const apiUrl = import.meta.env.VITE_BACKEND_MOVIES; // URL de tu backend

// Función para hacer peticiones genéricas al backend
const fetchFromBackend = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Para manejar cookies si es necesario
    });
    if (!response.ok) {
      throw new Error("Error en fetchFromBackend");
    }
    return await response.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};

// Función para obtener todas las películas con paginación
export const getMoviesFromBackend = async (page = 1) => {
  return fetchFromBackend(`/?page=${page}`);
};

// Función para obtener los detalles de una película
export const getMovieFromBackend = async (id) => {
  return fetchFromBackend(`/${id}`);
};
// Función para buscar películas
export const searchMoviesFromBackend = async (searchQuery, page = 1) => {
  return fetchFromBackend(`/search?query=${searchQuery}&page=${page}`);
};

// Función para agregar una película a los favoritos
export const addMovieToFavorites = async (movieId) => {
  return fetchFromBackend(`/${movieId}/favorite`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  });
};

// Función para eliminar una película de los favoritos
export const removeMovieFromFavorites = async (movieId) => {
  return fetchFromBackend(`/${movieId}/favorite`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  });
};

// Función para agregar una reseña a una película
export const addReviewToMovie = async (movieId, review) => {
  return fetchFromBackend(`/${movieId}/review`, {
    method: "POST",
    body: JSON.stringify({ review }),
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  });
};

// Función para eliminar una reseña de una película
export const deleteReviewFromMovie = async (movieId, reviewId) => {
  return fetchFromBackend(`/${movieId}/review/${reviewId}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  });
};

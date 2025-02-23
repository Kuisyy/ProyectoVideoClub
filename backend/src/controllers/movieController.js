import { Movie } from "../models/Movie.js";
import { User } from "../models/User.js";

// Obtener todas las películas con paginación
export const getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Página solicitada
    const moviesPerPage = 20; // Número de películas por página
    const skip = (page - 1) * moviesPerPage; // Número de películas a saltar según la página

    const movies = await Movie.find()
      .skip(skip)
      .limit(moviesPerPage)
      .populate("reviews.user", "name email"); // Poblamos los usuarios de las reseñas

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies" });
  }
};

// Obtener una película por ID
export const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("reviews.user", "name email");
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie" });
  }
};

// Agregar una película a favoritos
export const addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Si no está en favoritos, la agregamos
    if (!user.favorites.includes(req.params.movieId)) {
      user.favorites.push(req.params.movieId);
      await user.save();
    }

    res.json({ message: "Movie added to favorites" });
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite" });
  }
};

// Eliminar una película de favoritos
export const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Eliminamos la película de favoritos
    user.favorites = user.favorites.filter((id) => id.toString() !== req.params.movieId);
    await user.save();

    res.json({ message: "Movie removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Error removing favorite" });
  }
};

// Agregar una reseña a una película
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Añadimos la reseña a la película
    movie.reviews.push({ user: req.user.id, rating, comment });
    await movie.save();

    res.json({ message: "Review added", movie });
  } catch (error) {
    res.status(500).json({ message: "Error adding review" });
  }
};

// Eliminar una reseña de una película
export const deleteReview = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Eliminamos la reseña
    movie.reviews = movie.reviews.filter((review) => review._id.toString() !== req.params.reviewId);
    await movie.save();

    res.json({ message: "Review deleted", movie });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review" });
  }
};

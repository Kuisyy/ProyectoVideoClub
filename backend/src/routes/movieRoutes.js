import { Router } from "express";
import {
  getMovies,
  getMovie,
  addFavorite,
  removeFavorite,
  addReview,
  deleteReview,
} from "../controllers/movieController.js";
import { authenticateToken } from "../middleware/auth.js"

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/:movieId/favorite", authenticateToken, addFavorite); // Proteger ruta para agregar favorito
router.delete("/:movieId/favorite", authenticateToken, removeFavorite); // Proteger ruta para eliminar favorito
router.post("/:movieId/review", authenticateToken, addReview); // Proteger ruta para agregar reseña
router.delete("/:movieId/review/:reviewId", authenticateToken, deleteReview); // Proteger ruta para eliminar reseña

export default router;

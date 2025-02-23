import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    tmdbId: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    overview: String,
    posterPath: String,
    releaseDate: String,
    genres: [String],
    rating: Number,
    reviews: [reviewSchema], 
  },
  { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);

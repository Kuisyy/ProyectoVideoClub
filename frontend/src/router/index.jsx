import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import MovieList from "../pages/MovieList";
import Reviews from "../pages/Reviews";
import Favourites from "../pages/Favourites";
import { ROUTES } from "./paths";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import SearchPage from "../pages/SearchPage";



export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: ROUTES.LOGIN,
                element: <LoginPage />
            },
            {
                path: ROUTES.REGISTER,
                element: <RegisterPage />
            },
            {
                path: ROUTES.LOGOUT,
                element: <LoginPage />
            },
            {
                path: ROUTES.MOVIELIST,
                element: <MovieList />
            },
            {
                path: ROUTES.MOVIE_DETAIL, 
                element: <MovieDetail />
            },
            {
                path: ROUTES.SEARCH,
                element: <SearchPage />
            },              
            {
                path: ROUTES.REVIEWS,
                element: (
                    <ProtectedRoute>
                        <Reviews />
                    </ProtectedRoute>
                )
            },
            {
                path: ROUTES.FAVOURITES,
                element: (
                    <ProtectedRoute>
                        <Favourites />
                    </ProtectedRoute>
                )
            },
            {
                path: ROUTES.ABOUT,
                element: <AboutPage />
            }
        ]
    }
]);

export default router;


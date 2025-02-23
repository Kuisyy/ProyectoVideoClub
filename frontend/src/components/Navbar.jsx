import { NavLink } from "react-router-dom"
import { ROUTES } from "../router/paths"

const Navbar = () => {
  return (
    <nav className="bg-sky-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-start">          
          <div className="flex justify-between h-16">
            {/* Seccion izq del nav */}
          </div>
          <div className="flex items-center">
            <NavLink to="/" className="text-lg font-bold">VideoClub</NavLink>
            <div className="flex space-x-4 ml-10">
                <NavLink to={ROUTES.MOVIELIST} className="hover:text-amber-600">Movies</NavLink>
                <NavLink to={ROUTES.SEARCH} className="hover:text-amber-600">Search</NavLink>
                <NavLink to={ROUTES.REVIEWS} className="hover:text-amber-600">Reviews</NavLink>
                <NavLink to={ROUTES.FAVOURITES} className="hover:text-amber-600" >Favourites</NavLink>
                <NavLink to={ROUTES.ABOUT} className="hover:text-amber-600" >About</NavLink>
            
            </div>
          </div>
        </div>
    </nav>
  )
}

export default Navbar
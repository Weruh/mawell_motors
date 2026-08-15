import { Link } from "react-router-dom";
import mawelLogo from "../assets/mawell3.png";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-gray-50 shadow-sm">
      <div className="mx-auto grid h-20 w-full grid-cols-3 items-center px-6 md:px-12">

      
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={mawelLogo}
              alt="Mawel Motors"
              className="h-14 w-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </Link>
        </div>

       
        <div className="flex items-center justify-center">
          <Link
            to="/dealership"
            className="rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-wider text-gray-700 transition-all duration-200 hover:bg-gray-200 hover:text-gray-950"
          >
            Dealership
          </Link>
        </div>

    
        <div className="flex justify-end">
          <Link
            to="/admin"
            className="rounded-lg bg-[#C1E8FF] px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a9ddf8] hover:shadow-md"
          >
            Admin Panel
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
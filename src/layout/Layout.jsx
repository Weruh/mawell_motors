import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar";

function Layout() {
  return (
    <div>
      
      <Navbar />
       <main>
            <Outlet />
       </main>
      
    </div>
  );
}

export default Layout;

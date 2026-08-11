import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between",width: "100%", height: "10vh", backgroundColor: "skyblue",padding: "0 30px", boxSizing: "border-box",color:'black',}} >
      <div>
        <Link to="/">
          <img src="/src/assets/mawel2.png" alt="Mawel Motors"  style={{ width: "80px", height: "80px", objectFit: "contain",}}/>
        </Link>
      </div>

     
      <div style={{display: "flex",  gap: "30px", }} >
        <Link to="/dealership">Dealership</Link>
      </div>

      <div>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;
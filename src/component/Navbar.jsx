import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{ display: "grid",gridTemplateColumns: "1fr 1fr 1fr",alignItems: "center",width: "100%", height: "10vh", backgroundColor: "#C1E8FF",padding: "0 30px", boxSizing: "border-box",}} >
      <div>
        <Link to="/">
          <img src="/src/assets/mawell3.png" alt="Mawel Motors" style={{ width: "120px", height: "120px", objectFit: "contain", marginBottom:"20px" }}  />
        </Link>
      </div>

     
      <div style={{ display: "flex", justifyContent: "center", gap: "30px", }} >
        <Link to="/dealership" style={{ textDecoration: "none", color: "black",  fontWeight: "700",  fontSize: "18px", }} >
          Dealership
        </Link>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", }}
      >
        <Link to="/admin" style={{ textDecoration: "none", color: "black", fontWeight: "700", fontSize: "18px"  }}>
          Admin
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
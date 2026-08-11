
import { Link } from 'react-router';

function Navbar() {
  return (
    <>
        <Navbar style={{display:'flex', backgroundColor:'red', }} >
            <Link to="/home"> <img src="/src/assets/mawel2.png" alt="mawel.png" srcset="" /></Link>
            <Link to="/dealership">Dealership</Link>
            <Link to="/admin" >Admin</Link>
        </Navbar>
    </>
  )
}

export default Navbar
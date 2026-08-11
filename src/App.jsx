import { Route, Routes } from "react-router-dom"
import Layout from './layout/Layout'
import Dealership from './pages/Dealership';
import Home from './pages/Home';
import Admin from './pages/Admin';




function App() {
  return (
    <Routes >
      <Route path='/' element={<Layout /> }>
      <Route index element={<Home />  }/>
      <Route path='dealership' element={<Dealership />  }/>
      <Route path='admin' element={<Admin />  }/>
     </Route>
      
    </Routes>
  )
}

export default App
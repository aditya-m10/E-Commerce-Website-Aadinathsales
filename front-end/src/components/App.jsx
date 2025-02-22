import Home from './pages/home/Home'; 
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import Contact from "./pages/contact/Contact";
import Layout from './Layout'; 
import ResLogin from './pages/Auth/ResLog';
// import Dashboard from './pages/Auth/DashNav';
import ResetPassword from './pages/Auth/Resetpassword';
import { useSelector } from "react-redux";
import ResetmailPassword from './pages/Auth/Mailreset';
import Footer from './pages/home/Footer';
import Checkout from './pages/Dashborad/checkout/Checkout';
import Success from './pages/Dashborad/checkout/Success';
import Dashlayout from "./Dashlayout"
import Profile from './pages/Dashborad/Profile/Profile';
import Ownproduct from './pages/Dashborad/myproduct/Ownproduct';
import Products from './pages/home/ProductList';


function App() {
  const { access_token } = useSelector(state => state.auth)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Layout/>} >
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="reslogin" element={!access_token ? <ResLogin /> : <Navigate to="/dash/checkout" />} />
          <Route path="footer" element={<Footer />} />
          <Route path="product" element={<Products />} />
        </Route>
         
        <Route  path="/dash" element={access_token? <Dashlayout/>: <Navigate to="/reslogin" />} >
           <Route index element={< Profile/>} />
           <Route path="checkout" element={< Checkout/>} />
           <Route path="reset" element={<ResetPassword /> } />
           <Route path="addproduct" element={<Ownproduct /> } />
           <Route path="success" element={<Success />} />
        </Route>    
        
        <Route path="api/user/reset/:id/:token" element={<ResetmailPassword />} />
        <Route path="*" element={<h1>Error 404 </h1>} />
      </Routes>
    </BrowserRouter>

    </>
  )

}

export default App;

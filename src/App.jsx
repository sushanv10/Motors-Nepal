import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aos from 'aos';
import "aos/dist/aos.css";
import NavBar from './NavBarComponent/NavBar';
import Hero from './Components/Hero';
import AboutSection from './Components/AboutSection';
import Banner from './Components/Banner/Banner';
import ShopSection from './Components/ShopSection';
import Login from './LogonRegister/Login'; 
import Register from './LogonRegister/Register'// Import the Login component
import FeaturedBike from './Components/FeaturedBike';
import FooterComponent from './Footer/FooterComponent';
import Shop from './ShopComponent/Shop'
import VideoSection from './Components/video';
import ContactPage from './ContactPage/ContactPage';
import AboutPage from './AboutPage/AboutPage'
import ScrollToTop from './ScrollToTop/ScrollToTop';
import InventoryPage from './InventoryPage/InventoryPage';
import ProductPage from './ProductPage/ProductPage';
import ProfilePage from './ProfilePage/ProfilePage';
import PrivateRoute from './Route/PrivateRoute';
import UserDashboard from './UserDashboard/UserDashboard';
import AdminDashboard from './Admin/AdminDashboard'
import AdminRoute from './Route/AdminRoute';
import { Dashboard } from '@mui/icons-material';
import AddCategory from './Admin/AddCategory';
import AddProduct from './Admin/AddProduct';
import ProductList from './Admin/ProductLists';
import CartPage from './CartPage/CartPage';
import AddBike from './Admin/AddBike';
import BikeList from './Admin/BikeList';
import ViewMore from './InventoryPage/ViewMore';
import BookingPage from './InventoryPage/Booking/BookingPage';
// import AddBikeDetails from './Admin/BikeDetail';
// import UpdateBike from './Admin/EditBike';
// import SearchPage from './SearchPage/SearchPage';
// import EditProfile from './ProfilePage/ProfileEdit';



function App() {
  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

  

  return (
    <Router>
      <ScrollToTop /> 
      <NavBar />
      <Routes>
        <Route path="/" element={<>
          <Hero />
          <AboutSection />
          <ShopSection />
          <Banner />
          <FeaturedBike/>
          <VideoSection/>
          <FooterComponent/>
        </>} />
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<UserDashboard/>} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard/>} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList/>}/>
          <Route path='bike-list' element={<BikeList/>}/>
          <Route path='add-bike' element={<AddBike/>}/>
          {/* <Route path='bike-detail' element={<AddBikeDetails/>}/> */}
          {/* <Route path='edit-bike/:id' element={<UpdateBike/>}/> */}

          

        </Route>
          
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/inventory' element={<InventoryPage/>}/>
        <Route path='/bikes/:id' element={<ViewMore/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
         {/* <Route path="/profile/edit" element={<EditProfile/>} /> */}
        <Route path="/register" element={<Register/>} />
        <Route path='/product/:id' element={<ProductPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        
        {/* <Route path='/search' element={<SearchPage/>}/> */}
        {/* <Route path='/dashboard' element={<UserDashboard/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;

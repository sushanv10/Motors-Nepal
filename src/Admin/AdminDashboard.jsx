import React, { useState } from 'react';
import { useAuth } from '../Context/Auth';
import { FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import Dashboard from './Dashboard';
import AddProduct from './AddProduct';
import AddCategory from './AddCategory';
import Header from './Header';
import ProductList from './ProductLists';
import AddBike from './AddBike';

import BikeList from './BikeList';
// import AddBikeDetails from './BikeDetail';

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem("auth");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'ProductList':
        return <ProductList/>;
      case 'CreateProduct':
        return <AddProduct />;
      
      case 'CategoryList':
        return <div>Category List Component</div>;
      case 'CreateCategory':
        return <AddCategory />;
      
      case 'BikeLists':
        return <BikeList/>;
      case 'AddBike':
        return <AddBike/>;

      // case 'BikeDetail':
      //   return <AddBikeDetails/>;
     
    
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        <div className="flex">
          <SideBar setActiveComponent={setActiveComponent} />
          <div className="flex flex-col flex-grow mt-5">
            <Header />  {/* Header is placed here */}
            <div className="flex-grow p-6">
              {renderActiveComponent()}
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleLogout} icon={<FaSignOutAlt className="ml-2" />}>Logout</button>
    </>
  );
};

export default AdminDashboard;

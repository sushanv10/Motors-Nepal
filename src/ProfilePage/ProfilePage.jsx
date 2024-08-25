import React from 'react';

import { useAuth } from '../Context/Auth';

import UserDashboard from '../UserDashboard/UserDashboard';
import AdminDashboard from '../Admin/AdminDashboard';


export default function ProfilePage() {
  const [auth] = useAuth();
  
  return (
    <>
   

    <div className="">
      {auth.user && auth.user.role === "admin" ? <AdminDashboard /> : <UserDashboard/>}

      
      

    </div>
    
    </>
    
   
  );
}

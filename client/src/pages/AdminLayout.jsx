import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PackageOpen,
  ShoppingCart
} from 'lucide-react';
import logo from "../assets/images/logo.png";
import { logout } from '../services/authService';
import { toast } from 'react-toastify';

const AdminLayout = () => {
  const sidebarLinks = [
    { name: "Add Product", path: "/admin/add-product", icon: <LayoutDashboard className="w-6 h-6" /> },
    { name: "View Products", path: "/admin/view-products", icon: <PackageOpen className="w-6 h-6" /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCart className="w-6 h-6" /> },
  ];

  const navigate = useNavigate()

const handleSignOut = async()=>{
  try {
    await logout();
          toast.success("Logged Out")
          navigate('/')
  } catch (error) {
    console.log(error)
    
  }
}
  

  return (
    <div className='min-h-screen flex flex-col'>
      
    
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <a href="/">
          <img className="h-9 invert" src={logo} alt="dummyLogoColored" />
        </a>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button onClick={handleSignOut} className='border bg-black text-white rounded-full text-sm px-4 py-1 cursor-pointer'>Logout</button>
        </div>
      </div>

      
      <div className="lg:hidden border-b border-gray-300 bg-white px-2 sm:px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {sidebarLinks.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-2 whitespace-nowrap
                 ${isActive
                    ? "border-b-4 bg-gray-100/90 border-black text-black"
                    : "hover:bg-gray-100/90 border-white text-gray-700"}`
              }
              end
            >
              {item.icon}
              <p className="text-sm">{item.name}</p>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex flex-1">

        
        <div className="hidden lg:flex md:w-64 border-r border-gray-300 pt-4 flex-col bg-white">
          {sidebarLinks.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 
                 ${isActive
                    ? "border-r-4 md:border-r-[6px] bg-gray-100/90 border-black text-black"
                    : "hover:bg-gray-100/90 border-white text-gray-700"}`
              }
              end
            >
              {item.icon}
              <p>{item.name}</p>
            </NavLink>
          ))}
        </div>

       
        <div className="flex-1 px-3 py-4 sm:px-5 sm:py-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

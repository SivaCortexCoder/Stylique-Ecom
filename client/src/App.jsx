import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from "./pages/AdminLogin";
import AddProduct from "./pages/AddProduct";
import Myorders from "./pages/Myorders";
import Checkout from "./pages/Checkout";
import AdminLayout from "./pages/AdminLayout";
import ViewProducts from "./pages/ViewProducts";
import Orders from "./pages/Orders";
import PageNotFound from "./pages/PageNotFound";
import { useAuthStore } from "./store/useAuthStore";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const AppLayout = () => {
  const location = useLocation();
  const shouldShowNavbar = !location.pathname.startsWith("/admin");
  
  const { currentUser, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    // Initialize auth listener
    const unsubscribe = initializeAuth();
    
    // Clean up listener on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [initializeAuth]);

  return (
    <div className="outfit min-h-screen flex flex-col">
      {shouldShowNavbar && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<Checkout/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-orders" element={<Myorders/>}/>
          <Route path="/admin/login" element={<AdminLogin/>}/>

          <Route path="/admin" element={
            <AdminProtectedRoute user={currentUser} isLoading={isLoading}>
              <AdminLayout/>
            </AdminProtectedRoute>
          }>
            <Route path="add-product" element={<AddProduct />} />
            <Route path="view-products" element={<ViewProducts />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
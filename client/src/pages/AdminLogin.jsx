import React, { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase/firebaseConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  signinWithGoogle } from '../services/authService';
import { useAuthStore } from '../store/useAuthStore';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const { currentUser, refreshUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (currentUser?.isAdmin) {
      navigate('/admin/add-product');
    }
  }, [currentUser, navigate]);



  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user is admin
      const res = await axios.get(`${baseURL}/api/user/is-admin/${user.uid}`);
      
      if (res.data.isAdmin) {
        // Refresh user data in store
        await refreshUser();
        toast.success('Welcome Admin');
        navigate('/admin/add-product');
      } else {
        toast.error(' Unauthorized access');
        await logout();
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid login credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      const result = await signinWithGoogle();
      const user = result.user;

      // Check if user is admin
      const res = await axios.get(`${baseURL}/api/user/is-admin/${user.uid}`);
      
      if (res.data.isAdmin) {
        // Refresh user data in store
        await refreshUser();
        toast.success('Welcome Admin');
        navigate('/admin/add-product');
      } else {
        toast.error(' Unauthorized access');
        await logout(); // Log out non-admin user
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error('Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="ml-10 mt-5 flex gap-2 bg-black text-white px-4 py-2 cursor-pointer rounded"
      >
        <LogOut className="w-5" />
        Home
      </button>


      <div className="my-20">
        <div className="bg-white text-gray-500 max-w-96 mx-auto md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Admin Panel</h2>
          
          <form onSubmit={handleAdminLogin}>
            <input
              id="email"
              className="w-full bg-transparent border my-3 border-gray-500/30 outline-none focus:border-2 focus:border-black rounded-full py-2.5 px-4"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <input
              id="password"
              className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none focus:border-2 focus:border-black rounded-full py-2.5 px-4"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full my-3 bg-black py-2.5 cursor-pointer rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Log in'}
            </button>
          </form>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              className="h-4 w-4"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
              alt="googleFavicon"
            />
            {isLoading ? 'Signing in...' : 'Log in with Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
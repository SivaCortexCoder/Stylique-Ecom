import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import {
  Menu,
  ShoppingCart,
  X,
  CircleUserRound,
  User,
  Package,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase/firebaseConfig";
import { useCartStore } from "../store/useCartStore";
import { logout } from "../services/authService";
import { toast } from "react-toastify";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const { cart } = useCartStore();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLogged(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged Out");
      setIsLogged(false);
      setShowUserMenu(false);
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-9 invert opacity-80" />
        </Link>

        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="group flex flex-col gap-0.5 text-gray-700"
            >
              {link.name}
              <div className="bg-gray-700 h-0.5 w-0 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <Link
            to={"/admin/login"}
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer text-black transition-all hover:bg-gray-50"
          >
            Admin Panel
          </Link>
        </div>

        <div className="flex items-center gap-3 relative">
          {isLogged ? (
            <div className="relative">
            
              <button
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

             
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-[999] ">
                 
                  <div className="flex justify-end p-2 border-b border-gray-100">
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>

                 
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Welcome!</p>
                        <p className="text-xs text-gray-500">Manage your account</p>
                      </div>
                    </div>
                  </div>

                 
                  <div className="py-2">
                    <Link
                      to="/my-orders"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Package className="w-4 h-4" />
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-black cursor-pointer text-white px-8 py-2 rounded-full ml-4 transition-all duration-500 hover:bg-gray-800"
            >
              Login
            </button>
          )}

          <button
            onClick={() => navigate("/cart")}
            className="flex items-center relative"
          >
            <ShoppingCart className="w-6 h-6 cursor-pointer" />
            <p className="text-indigo-600 ml-1">
              {cart.length === 0 ? "" : `(${cart.length})`}
            </p>
          </button>

          <button onClick={handleMobileMenuToggle}>
            <Menu className="h-6 w-6 cursor-pointer md:hidden" />
          </button>
        </div>


        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 z-40 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={handleMobileMenuClose}
          >
            <X className="h-6 w-6" />
          </button>

          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={handleMobileMenuClose}
              className="hover:text-gray-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/admin/login"
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all hover:bg-gray-50"
          >
            Admin Panel
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

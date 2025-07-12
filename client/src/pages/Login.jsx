import React, { useEffect, useState } from "react";
import { Mail, UserLock,} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginWithEmail, signinWithGoogle } from "../services/authService";
import auth from "../firebase/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await loginWithEmail(email, password);
      if (!userCredential.user.emailVerified) {
        toast.warn("Please verify your email before logging in.");
        return;
      }

      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Invalid Credentials");
      } else {
        toast.error("Login failed. Try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signinWithGoogle(); 
      toast.success(`Welcome ${result.user.displayName}`);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="my-30">
      <div className="flex h-[700px] max-w-6xl mx-auto rounded-2xl">
        <div className="w-full hidden md:inline-block">
          <img
            className="h-full rounded-2xl"
            src="https://images.unsplash.com/photo-1743452676894-135dc32ef614?w=600&auto=format&fit=crop&q=60"
            alt="leftSideImage"
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <form className="md:w-96 w-80 flex flex-col items-center justify-center">
            <h2 className="text-4xl text-gray-900 font-medium">Log in</h2>
            <p className="text-sm text-gray-500/90 mt-3">
              Welcome back! Please Log in to continue
            </p>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full cursor-pointer"
            >
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                alt="googleLogo"
              />
            </button>

            <div className="flex items-center gap-4 w-full my-5">
              <div className="w-full h-px bg-gray-300/90"></div>
              <p className="w-full text-nowrap text-sm text-gray-500/90">
                or Log in with email
              </p>
              <div className="w-full h-px bg-gray-300/90"></div>
            </div>

            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <Mail style={{ stroke: "#7880A0" }} />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email id"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none  text-sm w-full h-full"
                required
              />
            </div>

            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <UserLock style={{ stroke: "#7880A0" }} />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
              <div className="flex items-center gap-2">
                <input className="h-5" type="checkbox" id="checkbox" />
                <label className="text-sm" htmlFor="checkbox">
                  Remember me
                </label>
              </div>
              <a className="text-sm underline" href="#">
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleLogin}
              type="submit"
              className="cursor-pointer mt-8 w-full h-11 rounded-full text-white bg-black hover:opacity-90 transition-opacity"
            >
              Login
            </button>
            <p className="text-gray-500/90 text-sm mt-4">
              Don’t have an account?{" "}
              <Link to={"/signup"} className="text-indigo-400 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

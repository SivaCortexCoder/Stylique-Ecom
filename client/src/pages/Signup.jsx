import React, { useState } from "react";
import { Mail, User, UserLock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from "firebase/auth";
import auth, { googleProvider } from "../firebase/firebaseConfig";
import { registerWithEmail, signinWithGoogle } from "../services/authService";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleconfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  console.log(name, email, password, confirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await registerWithEmail(email,password)
    toast.success("Signup successful! Please verify your email.");
    navigate("/login");

    } catch (error) {
      toast.error(error.message);
    }
  };


    const handleGoogleLogin = async ()=>{
      try {
      const data =   await signinWithGoogle()
      toast.success(`Welcome ${data.user.displayName}`);
      navigate("/");
      } catch (error) {
        toast.error(error.message);
        
      }
      

  }


  return (
    <div className="mt-25">
      <div className="my-30 ">
        <div className="flex h-[700px] max-w-6xl mx-auto rounded-2xl ">
          <div className="w-full hidden md:inline-block">
            <img
              className="h-full rounded-2xl"
              src="https://images.unsplash.com/photo-1601136610007-1ecf5706c908?q=80"
              alt="leftSideImage"
            />
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <form className="md:w-96 w-80 flex flex-col items-center justify-center">
              <h2 className="text-4xl text-gray-900 font-medium">Sign Up</h2>
              <p className="text-sm text-gray-500/90 mt-3">
                Welcome! Please Sign in to continue
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
                  or Sign in with email
                </p>
                <div className="w-full h-px bg-gray-300/90"></div>
              </div>

              <div className="flex items-center  w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <User style={{ stroke: "#7880A0" }} />
                <input
                  onChange={handleName}
                  type="text"
                  placeholder="Name"
                  className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                  required
                />
              </div>

              <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Mail style={{ stroke: "#7880A0" }} />
                <input
                  onChange={handleEmail}
                  type="email"
                  placeholder="Email id"
                  className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none  text-sm w-full h-full"
                  required
                />
              </div>

              <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <UserLock style={{ stroke: "#7880A0" }} />
                <input
                  onChange={handlePassword}
                  type="password"
                  placeholder="Password"
                  className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                  required
                />
              </div>

              <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <UserLock style={{ stroke: "#7880A0" }} />
                <input
                  onChange={handleconfirmPassword}
                  type="password"
                  placeholder="Confirm Password"
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
              </div>

              <button
                onClick={handleSubmit}
                type="submit"
                className="cursor-pointer mt-8 w-full h-11 rounded-full text-white bg-black hover:opacity-90 transition-opacity"
              >
                Sign Up
              </button>
              <p className="text-gray-500/90 text-sm mt-4">
                Already have an account?{" "}
                <Link to={"/login"} className="text-indigo-400 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

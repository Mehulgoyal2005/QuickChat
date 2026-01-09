import React, { useState } from "react";
import assets from "../assets/assets";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function LoginPage() {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext);

  const onSubmitHandler = (event) => {
  event.preventDefault();

  if (currState === 'Sign up' && !isDataSubmitted) {
    setIsDataSubmitted(true);
    return;
  }
   login(currState === "Sign up" ? "signup" : "login", {
    fullName,
    email,
    password,
    bio,
   });
  }

  return (
    <div className="min-h-screen flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col">
      {/* -------- left -------- */}
      <div className="flex flex-col items-center gap-4">
        <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)] drop-shadow-[0_0_15px_rgba(0,123,255,0.5)]" />
        <h1 className="text-4xl font-bold tracking-tight">AnyChat</h1>
      </div>

      {/* -------- right -------- */}
      <form onSubmit={onSubmitHandler} className="glass-morphism text-white p-8 flex flex-col gap-6 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
  <img
    onClick={() => setIsDataSubmitted(false)}
    src={assets.arrow_icon}
    alt=""
    className="w-5 cursor-pointer"
  />
)}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="provide a short bio..."
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        )}

        <button
          type="submit"
          className="py-3 bg-primary hover:bg-secondary text-white rounded-lg cursor-pointer font-medium shadow-lg shadow-primary/20"
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span className="font-medium text-primary cursor-pointer hover:underline"
              onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}}>
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              Create an account{" "}
              <span className="font-medium text-primary cursor-pointer hover:underline"
               onClick={()=>{setCurrState("Sign up");}}>
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

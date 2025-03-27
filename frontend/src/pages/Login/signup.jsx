import React, { useState } from "react";
import "./signup.css";
import { Auth, db } from "../../../../backend/firebase/firebase.js";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const navigate = useNavigate();

  // 📝 Email & Password Signup Function
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(Auth, email, password);
      let user = Auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstname: fname,
          lastname: lname,
        });
      }
      toast.success("Account created successfully!", { position: "top-right" });
      navigate("/home"); // Redirect to home after signup
    } catch (error) {
      toast.error("Error: " + error.message, { position: "top-right", autoClose: 3000 });
    }
  };

  // 🎯 Google Sign-up Function
  const GoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(Auth, provider);
      toast.success("Google Sign-up Successful!", { position: "top-right" });
      navigate("/");
    } catch (error) {
      toast.error("Google Sign-up Failed", { position: "top-right" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="start">
        <div className="container">
          <h2 className="page-heading"> Create Your Account</h2>
          <p className="page-subtext">Join AI Diary and start your journey today!</p>

          {/* ✍️ Email & Password Signup */}
          <form className="form" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className="input"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="input"
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
            <button type="submit" className="login-button">Sign Up</button>
          </form>

          {/* 🔵 Google Signup */}
          <div className="social-account-container">
            <span className="title">Or Login with</span>
            <button className="social-button google" onClick={GoogleSignUp}>
            <svg viewBox="0 0 488 512" height="1em">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
            </button>
          </div> 

          {/* 🚀 Login Redirect */}
          <p className="redirect-signup">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;

// src/components/Login.jsx
import React, { useState } from "react";
import "../styles/login.css";

import { auth } from "../firebase"; // <-- Make sure this points to the same firebase.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        email.trim(), 
        password
      );
      // If signIn succeeds, you get back userCredential.user
      console.log("Login successful:", userCredential.user);
      // Redirect to Dashboard (or wherever)
      navigate("/dashboard");
    } catch (error) {
      // Log the entire error object so you can see code & message in the browser console:
      console.error("Firebase signIn error:", error);

      // Now choose a friendly message based on error.code:
      switch (error.code) {
        case "auth/invalid-email":
          setErrorMsg("Invalid email address format.");
          break;
        case "auth/user-disabled":
          setErrorMsg("This user account has been disabled.");
          break;
        case "auth/user-not-found":
          setErrorMsg("No user found with this email.");
          break;
        case "auth/wrong-password":
          setErrorMsg("Wrong password. Please try again.");
          break;
        default:
          // Show the Firebase message if you want more detail:
          setErrorMsg(error.message || "Login failed. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>
        {errorMsg && <div className="error-text">{errorMsg}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="input-label">Email</label>
          <input
            id="email"
            type="email"
            className="input-field"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="input-label">Password</label>
          <input
            id="password"
            type="password"
            className="input-field"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

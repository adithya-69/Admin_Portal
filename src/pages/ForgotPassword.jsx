import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send password reset email goes here
    setMessage(`If an account exists for ${email}, a reset link has been sent.`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px", gap: "15px" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button type="submit" style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}>
          Reset Password
        </button>
      </form>
      {message && <p style={{ color: "green", marginTop: "10px", textAlign: "center" }}>{message}</p>}
      <Link to="/" style={{ marginTop: "20px" }}>Back to Login</Link>
    </div>
  );
};

export default ForgotPassword;
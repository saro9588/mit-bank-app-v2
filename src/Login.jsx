import React, { useState } from "react";
import { supabase } from "./supabaseClient";

const login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogIn = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    });
    if (error) {
      console.error("Login error:", error);
    } else {
      console.log("logged in");
      console.log(data);
    }
  };

  return (
    <div className="card">
      <h3>Sign in</h3>
      <form onSubmit={handleLogIn}>
        <div style={{ marginBottom: "10px" }}>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={userEmail}
            required={true}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={userPassword}
            required={true}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <div>
          <button style={{ marginTop: "10px", marginBottom: "20px" }}>
            <span>Sign in</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default login;

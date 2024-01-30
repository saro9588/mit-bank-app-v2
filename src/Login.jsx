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
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <p className="description">Sign in</p>
        <form className="form-widget" onSubmit={handleLogIn}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={userEmail}
              required={true}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div>
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
            <button className={"button block"}>
              <span>Sign in</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;

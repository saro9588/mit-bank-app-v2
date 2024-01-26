import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    setLoading(true);

    // Sign up logic
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      username,
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Signup successful! Check your email for verification.");
    }

    setLoading(false);
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <p className="description">Sign up with your email below</p>
        <form className="form-widget" onSubmit={handleSignup}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="text"
              placeholder="Username"
              value={username}
              required={true}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={"button block"} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Sign up</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

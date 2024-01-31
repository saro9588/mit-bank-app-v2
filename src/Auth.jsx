import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Signup successful!");
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h3>Sign up</h3>
      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: "10px" }}>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            required={true}
            style={{ width: "300px", height: "30px" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            required={true}
            style={{ width: "300px", height: "30px" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button style={{ marginTop: "10px" }} disabled={loading}>
            {loading ? <span>Loading</span> : <span>Sign up</span>}
          </button>
        </div>
      </form>
    </div>
  );
}

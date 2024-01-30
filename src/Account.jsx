import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function getAccount() {
      setLoading(true);
      const { user } = session;
      const { data, error } = await supabase
        .from("accounts")
        .select("id, balance")
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else {
          setUserData(data);
        }
      }

      setLoading(false);
      console.log(user.email);
      console.log(error); // Log any errors
      console.log(userData);
      console.log(data);
      console.log("User ID from Session:", user.id);
    }
    getAccount();
    return () => {
      ignore = true;
    };
  }, [session]);
  console.log("User Session:", session);

  return (
    <div>
      {loading && <p>Loading...</p>}
      <div
        style={{
          margin: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <h3>Welcome:</h3>
          <h3>{session.user.email}</h3>
        </div>
        <div>
          <button type="button" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </div>
      </div>

      {/* <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {userData && (
            <tr>
              <td>{userData.id}</td>
              <td>${userData.balance}</td>
            </tr>
          )}
        </tbody>
      </table> */}
    </div>
  );
}

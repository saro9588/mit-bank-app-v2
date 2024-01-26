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
        .select("id, username, email, balance")
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
      <div>
        <div>
          <p>Logged in as:</p>
          <p>{session.user.email}</p>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {userData && (
            <tr>
              <td>{userData.email}</td>
              <td>{userData.balance}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button
          className="button block"
          type="button"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

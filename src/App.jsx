import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Login from "./Login";
import Account from "./Account";
import Transactions from "./Transactions";
import { ThemeSupa } from "@supabase/auth-ui-shared";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      {!session ? (
        <>
          <div className="main">
            <h2>Welcome to the Bank App</h2>
            <h4>
              Here you can create an account, deposit, withdraw money and check
              your balance.
            </h4>
            <div>
              <Auth />
              <p>-- or --</p>
              <Login />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="main">
            <Account key={session.user.id} session={session} />
            <Transactions key={session.user.id} session={session} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;

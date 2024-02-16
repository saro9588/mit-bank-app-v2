import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Login from "./Login";
// import Account from "./Account";
import Transactions from "./Transactions";
import UserTransactionHistory from "./UserTransactionHistory";
// import SessionTest from "./SessionTest";

function App() {
  const [session, setSession] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        const { user } = session;
      } else {
        setSession(null);
        console.log("Session is set to null", session);
      }
      console.log("user session:", session);
    });
  }, []);
  return (
    <div className="main">
      {/* <SessionTest session={session} setStateCallback={setIsLoggedIn} />
      <h1>{isLoggedIn}</h1> */}
      {!session ? (
        <>
          <div>
            <h2>Welcome to the Bank App</h2>
            <p className="h4">
              Here you can create an account, deposit, withdraw money and check
              your balance.
            </p>
            <hr
              style={{
                width: "80%",
                marginBottom: "20px",
                border: "0.5px solid #000",
              }}
            />
            <div style={{ display: "grid", justifyContent: "center" }}>
              <Auth />
              <p>-- or --</p>
              <Login />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="main">
            {/* <Account
              key={session.user.id}
              session={session}
              setSession={setSession}
            /> */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <h3>Welcome</h3>
              <h3>{`${session.user.email}!`}</h3>
            </div>
            <hr
              style={{
                width: "80%",
                marginBottom: "20px",
                border: "0.5px solid #000",
              }}
            />
            <Transactions key={session.user.id} session={session} />
            <UserTransactionHistory session={session} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;

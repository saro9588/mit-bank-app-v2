import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const Transactions = ({ session }) => {
  const [deposit, setDeposit] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");
  const { user } = session;

  useEffect(() => {
    const fetchBalance = async () => {
      const { data, error } = await supabase
        .from("accounts")
        .select("balance")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setBalance(data.balance || 0);
      }
    };

    fetchBalance();
  }, [user.id]);

  const handleDeposit = async () => {
    const newBalance = balance + deposit;
    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .upsert([
        {
          id: user.id,
          balance: newBalance,
        },
      ]);

    if (error) {
      console.error(error);
    } else {
      console.log("Deposit successful. New balance:", newBalance);
      setBalance(newBalance);
      setDeposit("");
    }
    const { data: transactions, error: transactionError } = await supabase
      .from("transactions")
      .insert([
        {
          id: user.id,
          deposit: deposit,
        },
      ]);
  };

  const handleWithdraw = async () => {
    if (withdraw > balance) {
      console.error("Insufficient funds for withdrawal");
      setError("Insufficient funds for withdrawal");
      return;
    }
    const newBalance = balance - withdraw;
    const { data, error } = await supabase.from("accounts").upsert([
      {
        id: user.id,
        balance: newBalance,
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      console.log("Withdrawal successful. New balance:", newBalance);
      setBalance(newBalance);
      setError("");
      setWithdraw("");
    }
  };

  const handleSignOut = () => {
    supabase.auth.signOut();
    // console.log("User Session:", session.user);
  };

  return (
    <div className="form">
      <div style={{ display: "grid", gap: "20px" }}>
        <div className="card">
          <h2>Current Balance: ${balance}</h2>
        </div>
        <div className="card">
          <h3>Transactions</h3>
        </div>
      </div>
      <div className="deposit">
        <h3>Deposit</h3>
        <div>
          <input
            type="number"
            min="0"
            value={deposit}
            style={{ width: "150px", height: "30px" }}
            onChange={(e) => setDeposit(Number(e.target.value))}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleDeposit}>Deposit</button>
        </div>
      </div>
      -- or --
      <div className="withdraw">
        <h3>Withdraw</h3>
        <div>
          <input
            type="number"
            min="0"
            value={withdraw}
            style={{ width: "150px", height: "30px" }}
            onChange={(e) => setWithdraw(Number(e.target.value))}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>
      </div>
      <div>
        <button type="button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <div>{error}</div>
    </div>
  );
};

export default Transactions;

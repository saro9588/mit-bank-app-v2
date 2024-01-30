import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const Transactions = ({ session }) => {
  const [deposit, setDeposit] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
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

    const { data, error } = await supabase.from("accounts").upsert([
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
      setDeposit(0);
    }
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
      setWithdraw(0);
    }
  };

  return (
    <div>
      <h2>Transactions</h2>
      <div>
        <p>Current Balance: ${balance}</p>
        <label>Deposit:</label>
        <input
          type="number"
          min="0"
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
      <div>
        <label>Withdraw:</label>
        <input
          type="number"
          min="0"
          value={withdraw}
          onChange={(e) => setWithdraw(Number(e.target.value))}
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
      <div>{error}</div>
    </div>
  );
};

export default Transactions;

import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Flex, Text, Button, Card } from "@radix-ui/themes";

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
    <div className="form">
      <h2>Transactions</h2>
      <h3>Current Balance: ${balance}</h3>
      <div className="deposit">
        <h3>Deposit</h3>
        <input
          type="number"
          min="0"
          value={deposit}
          style={{ width: "300px", height: "30px" }}
          onChange={(e) => setDeposit(Number(e.target.value))}
        />
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleDeposit}>Deposit</button>
        </div>
      </div>
      -- or --
      <div className="withdraw">
        <h3>Withdraw</h3>
        <input
          type="number"
          min="0"
          value={withdraw}
          style={{ width: "300px", height: "30px" }}
          onChange={(e) => setWithdraw(Number(e.target.value))}
        />
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>
      </div>
      <div>{error}</div>
    </div>
  );
};

export default Transactions;

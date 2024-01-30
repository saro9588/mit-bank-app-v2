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
      <p>Current Balance: ${balance}</p>
      {/* <div className="deposit">
        <label>Deposit:</label>
        <input
          type="number"
          min="0"
          value={deposit}
          width=""
          onChange={(e) => setDeposit(Number(e.target.value))}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
      <div className="withdraw">
        <label>Withdraw:</label>
        <input
          type="number"
          min="0"
          value={withdraw}
          onChange={(e) => setWithdraw(Number(e.target.value))}
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div> */}
      <Flex direction="column" gap="3" style={{ maxWidth: 350 }}>
        <Card variant="classic">
          <Text as="div" size="2" weight="bold">
            Deposit
          </Text>
          <Text as="div" color="gray" size="2">
            <div className="deposit">
              <input
                type="number"
                min="0"
                value={deposit}
                width=""
                onChange={(e) => setDeposit(Number(e.target.value))}
              />
              <Button onClick={handleDeposit}>Deposit</Button>
            </div>
          </Text>
        </Card>

        <Card variant="classic">
          <Text as="div" size="2" weight="bold">
            Withdraw
          </Text>
          <Text as="div" color="gray" size="2">
            <div className="withdraw">
              <input
                type="number"
                min="0"
                value={withdraw}
                onChange={(e) => setWithdraw(Number(e.target.value))}
              />
              <Button onClick={handleWithdraw}>Withdraw</Button>
            </div>
          </Text>
        </Card>
      </Flex>

      <div>{error}</div>
    </div>
  );
};

export default Transactions;

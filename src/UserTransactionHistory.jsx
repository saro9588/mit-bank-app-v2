import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const UserTransactionHistory = ({ session }) => {
  const [data, setData] = useState([]);
  // const [createdAt, setCreatedAt] = useState("");

  const { user } = session;

  useEffect(() => {
    const fetchUserTransactionHistory = async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select()
        .eq("id", user.id);

      if (error) {
        console.error(error);
      } else {
        setData(data || []);
        console.log(data);
      }
    };

    fetchUserTransactionHistory();
  }, [user.id]);

  return (
    <div>
      <h3>User Transaction History</h3>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Deposit Amount</th>
              <th>Withdraw Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((transaction, index) => (
                <tr key={transaction.transaction_id}>
                  <td>{index + 1}</td>
                  <td>${transaction.deposit}</td>
                  <td>${transaction.withdraw}</td>
                  <td>{transaction.created_at}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTransactionHistory;

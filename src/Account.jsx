// import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";

// export default function Account({ session, setSession }) {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     async function getAccount() {
//       const { user } = session;
//       const { data, error } = await supabase
//         .from("accounts")
//         .select("id, balance")
//         .eq("id", user.id)
//         .single();

//       if (error) {
//         console.warn(error);
//       } else {
//         setData(data);
//       }
//       setSession(session);
//       console.log(session.user.email);
//       console.log(error);
//       console.log(data);
//       console.log("User ID from Session:", user.id);
//     }
//     getAccount();
//   }, [session]);

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         gap: "5px",
//       }}
//     >
//       <div>
//         <h3>Welcome</h3>
//         <h3>{`${session.user.email}!`}</h3>
//       </div>
//     </div>
//   );
// }

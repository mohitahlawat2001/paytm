import { useEffect, useState } from "react";
import axios from "axios";

import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const Dashboard = () => {
  const [balance, setBalance] = useState(0); 
  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBalance(res.data.balance);
    };
    fetchBalance();
  }, []);
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={
          balance
        } />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;

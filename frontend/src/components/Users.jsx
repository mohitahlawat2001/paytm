import { useEffect, useState } from "react";

import User from "./User";

import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Users = () => {
  const [users, setUsers] = useState(null);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const debounce = setTimeout(() => {
      getUsers();
    }, 500);
    return () => {
      clearTimeout(debounce);
    }
  }, [filter]);

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/user/bulk?filter=${filter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(res.data.user);
  }


  return (
    <div className="flex flex-col">
      <div className="text-xl font-semibold">Users</div>
      <input
        type="text"
        placeholder="Search users"
        onChange= {(e) => setFilter(e.target.value)}
        className="border-2 border-gray-300 rounded-lg p-2 mt-2"
      />
      <div className="flex flex-col mt-4 ">
        {users && users.map((user,index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;

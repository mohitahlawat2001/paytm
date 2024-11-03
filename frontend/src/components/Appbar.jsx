import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Appbar = () => {
    const navigate = useNavigate();
  const [firstName, setFirstName] = useState("Hello");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    setFirstName(res.data.user.firstName);
    setLastName(res.data.user.lastName);
  };
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4 font-bold ">
        PayDone
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Welcome {firstName} {lastName}
        </div>
        <div className="h-12 w-12 rounded-full bg-slate-200 flex justify-center my-1 mr-4">
          <div className="flex flex-col justify-center h-full">
            {"U" && firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full mr-4">
        <Button
          onClick={() => {
            console.log("Logout");
            localStorage.removeItem("token");
            console.log("Logged out");
            navigate("/signin");
            console.log("Navigated to signin");
          }}
          label={"Logout"}
        />
        </div>
      </div>
    </div>
  );
};

export default Appbar;

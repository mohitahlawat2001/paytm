import { useState } from "react";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import {  useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 min-h-screen flex justify-center ">
      <div className="flex flex-col justify-center">
        <div className="w-80 bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center text-center">
          <Heading label={"SignUp"} />
          <SubHeading label={"Enter your information for creating an account"} />
          <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder={"john"} label={"First Name"} />
          <InputBox  onChange={(e) => setLastName(e.target.value)}
          placeholder={"doe"} label={"Last Name"} />
          <InputBox onChange={(e) => setEmail(e.target.value)}
           placeholder={"john@mail.com"} label={"Email"} />
          <InputBox onChange={(e) => setPassword(e.target.value)}
          placeholder={"password"} label={"Password"} />
          <div className="pt-4">
            <Button onClick={
              ()=>{
                axios.post(`${VITE_BACKEND_URL}/api/v1/user/signup`,
                  {
                  firstName:firstName,
                  lastName:lastName,
                  email:email,
                  password:password
                }).then((res)=>{
                  const token = res.data.token;
                  localStorage.setItem("token",token);
                  console.log(res.data)
                  navigate("/dashboard")
                }).catch((err)=>{
                  console.log(err)
                })
              }
            }
            label={"Sign Up"} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Signin"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

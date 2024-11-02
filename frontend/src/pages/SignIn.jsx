import { useState } from "react";

import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
    return (
        <div className="bg-slate-300 min-h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="w-80 bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center text-center">
          <Heading label={"SignUp"} />
           <SubHeading label={"enter your credentials"} />
          <InputBox placeholder={"john@mail.com"} label={"Email"} onChange={(e) => setEmail(e.target.value)} />
          <InputBox placeholder={"password"} label={"Password"} onChange={(e) => setPassword(e.target.value)} />
          <div className="pt-4">
            <Button
            onClick={async ()=>{
              const res = await axios.post(`${VITE_BACKEND_URL}/api/v1/user/signin`,{
                email:email,
                password:password
              });
              const token = res.data.token;
              localStorage.setItem("token",token);
              Navigate("/dashboard");
            } }
            label={"Sign in"} />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Signup"} to={"/"} />
        </div>
      </div>
    </div>
    );
    }

export default SignIn;
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const SignUp = () => {
  return (
    <div className="bg-slate-300 min-h-screen flex justify-center ">
      <div className="flex flex-col justify-center">
        <div className="w-80 bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center text-center">
          <Heading label={"SignUp"} />
          <SubHeading label={"Enter your information for creating an account"} />
          <InputBox placeholder={"john"} label={"First Name"} />
          <InputBox placeholder={"doe"} label={"Last Name"} />
          <InputBox placeholder={"john@mail.com"} label={"Email"} />
          <InputBox placeholder={"password"} label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign Up"} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Signin"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

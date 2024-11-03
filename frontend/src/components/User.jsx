import { useNavigate } from "react-router-dom";
import Button from "./Button";
const User = ({ user }) => {
    const {firstName,lastName,} = user;
    const Navigate = useNavigate();
    return (
        <div className="flex justify-between border-b-2 border-gray-300 p-2">
          <div className="flex">
            <div className="bg-slate-300 rounded-full w-12 h-12">
              <div className="flex justify-center items-center h-full">
                <span className="text-white">
                    {firstName[0].toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center ml-2">
                <div className="font-semibold">{firstName} {lastName}</div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            
              <Button onClick={() => {
                Navigate('/send?to='+user._id+'&name='+firstName);
              }} label={'send money'}  />
            
          </div>
        </div>
    );

}

export default User;
import { Link } from "react-router-dom";
const Users = () => {
  return (
    <div className="flex flex-col">
      <div className="text-xl font-semibold">Users</div>
      <input
        type="text"
        placeholder="Search users"
        className="border-2 border-gray-300 rounded-lg p-2 mt-2"
      />
      <div className="flex flex-col mt-4 ">
        <div className="flex justify-between border-b-2 border-gray-300 p-2">
          <div className="flex">
            <div className="bg-slate-300 rounded-full w-12 h-12">
              <div className="flex justify-center items-center h-full">
                <span className="text-white">A</span>
              </div>
            </div>
            <div className="flex flex-col justify-center ml-2">name</div>
          </div>
          <div className="flex justify-center items-center">
            <Link to="/send">
              <button className="bg-slate-700 text-white rounded-lg p-2">
                Send Money
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

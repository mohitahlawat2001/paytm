import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const Send = () => {
    const [searchParams] = useSearchParams();
    const to = searchParams.get('to');
    const name = searchParams.get('name');

    const [amount, setAmount] = useState(0);

    const sendMoney = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${VITE_BACKEND_URL}/api/v1/account/transfer`, {
            to,
            amount,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(res.data);
    }

    return (
        <div className="h-screen flex justify-center items-center bg-slate-300">
            <div className="bg-white p-8 rounded-lg shadow-lg  flex flex-col justify-center w-96">
                <h1 className="text-3xl font-bold text-center p-6">Send Money</h1>
                <div className="px-6 pt-3 pb-1 flex space-x-4 items-center" >
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-2xl">
                            {name[0].toUpperCase()}
                        </span>
                    </div>
                    <div className="text-center text-2xl font-semibold mt-2">
                        {name}
                    </div>
                </div>
                <div className="text-sm font-medium mx-6 " >
                    Amount (in Rs)
                </div>
                <div className="px-6" >
                    <input onChange={(e)=> setAmount(e.target.value) }  placeholder="enter amount" className="w-full p-2 border border-gray-300 rounded-lg mt-1" />
                </div>
                <div className="px-6 mt-4" >
                    <button 
                        onClick={sendMoney}
                    className="w-full bg-green-500 text-white p-2 rounded-lg">
                        Send
                    </button>
                </div>
                
            </div>
        
        </div>
    );
    }

export default Send;
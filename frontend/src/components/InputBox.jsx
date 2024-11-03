import React, { useState } from 'react';

const InputBox = ({ type = "text", placeholder, label, onChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="flex flex-col relative">
            <label className="text-md font-semibold text-left pt-1">{label}</label>
            <div className="relative">
                <input 
                    type={type === "password" && !isPasswordVisible ? "password" : "text"}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="border border-slate-400 focus:outline-none focus:border-slate-300 p-2 w-full rounded-md pr-10"
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                        {isPasswordVisible ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a21.35 21.35 0 015.07-6.07M1 1l22 22" />
                                <path d="M9.88 9.88A3 3 0 0112 12a3 3 0 013 3" />
                                <path d="M2 2l20 20" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

export default InputBox;
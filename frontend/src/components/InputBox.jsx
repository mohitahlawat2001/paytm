const InputBox = ({placeholder,label})=>{
    return(
        <div className="flex flex-col ">
            <label className="text-md font-semibold text-left pt-1">{label}</label>
            <input 
                type="text" 
                placeholder={placeholder}
                className="border border-slate-400 focus:outline-none focus:border-slate-300 p-2 w-full rounded-md"
            />
        </div>
    )
}

export default InputBox;
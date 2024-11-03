const Button = ({label,onClick}) =>{
    return(
        <button
            onClick={onClick}
         className="bg-blue-500 text-white p-2 rounded-md w-full ">
            {label}
        </button>
    )
}

export default Button;
import { Link } from "react-router-dom";

const BottomWarning = ({label,buttonText,to}) => {
    return (
        <div className="py-2 flex justify-center text-sm ">
            <strong className="font-semibold">{label}</strong>
            <Link  className="hover:underline  pointer pl-1" to={to}>
                {buttonText}
            </Link>
        </div>
        
    );
    }

    export default BottomWarning;
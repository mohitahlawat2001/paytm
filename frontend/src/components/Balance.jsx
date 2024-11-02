const Balance = ({value}) => {
    return (
        <div className="text-xl font-semibold">
            Your balance : Rs
            <span className="text-green-500 ml-1">
            {value}
            </span>
        </div>
    );
}

export default Balance;
const Button = ({onCLickHandle, text}) => {
    return (
        <>
            <button onClick={onCLickHandle}>{text}</button>
        </>
    )
}

export default Button;
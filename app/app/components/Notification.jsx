const Notification = ({ message, classStyle}) => {
    if (message === null) {
        return null
    }

    return (
        <div className={classStyle}>
            {message}
        </div>
    )
}

export default Notification;
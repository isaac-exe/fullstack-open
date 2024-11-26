const Notification = ({ notification }) => {
    if (notification.message === null) {
        return null
    }

    return (
        <div className={`notification ${notification.classType}`}>
            {notification.message}
        </div>
    )
}

export default Notification
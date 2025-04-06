import './styles.min.css'
function NotificationCard(props) {

    return (
        <>
            <div className="notification bg-gray-800 dark:bg-gray-900 w-full">
                <div className="notiglow"></div>
                <div className="notiborderglow"></div>
                <div className="notititle">{props.text}</div>
            </div>
        </>
    )
}

export default NotificationCard
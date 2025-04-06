import './styles.min.css'
function NotificationCard(props) {

    return (
        <>
            <div className="notification w-full">
                <div className="notiglow"></div>
                <div className="notiborderglow"></div>
                <div className="notititle">{props.text}</div>
            </div>
        </>
    )
}

export default NotificationCard
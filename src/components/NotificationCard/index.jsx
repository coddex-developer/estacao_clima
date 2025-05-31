import './styles.min.css'
function NotificationCard(props) {

    return (
        <>
            <div className="notification w-full">
                <div className="showElements noticard dark:bg-gray-700">
                    <img src={props.avatar} alt="avatar" />
                    <p className='notitext'>
                        {props.text}
                    </p>
                </div>
            </div>
        </>
    )
}

export default NotificationCard
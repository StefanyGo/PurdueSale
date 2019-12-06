import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
    const {email, notifications} = props;

    let filteredNotifs;
    if (!notifications) {
        console.log("aiya")
        filteredNotifs = notifications;
    } else {
        filteredNotifs = notifications.filter(
            notif => {
                console.log(email)
                if(notif.followers)
                return notif.followers.includes(email)
            }
        );
    }
    return (
        <div>
        <span className="card-title">Notifications</span>
        <ul className="notifications">
            {
                filteredNotifs && filteredNotifs.map(item => {
                    return (
                        <li key={item.id}>
                            <span>Hi there! {item.message}</span>
                            <div className="grey-text note-date">
                                {moment(item.time.toDate()).fromNow()}
                            </div>
                        </li>
                    )
                })
            }
        </ul>
        </div>
    )
}

export default Notifications
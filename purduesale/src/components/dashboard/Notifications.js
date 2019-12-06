import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
    const {notifications} = props;
    return (
        <div>
        <span className="card-title">Notifications</span>
        <ul className="notifications">
            {
                notifications && notifications.map(item => {
                    return (
                        <li key={item.id}>
                            <span>{item.message}</span>
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
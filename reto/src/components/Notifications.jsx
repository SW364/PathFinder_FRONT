import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Notification.css';

const Notifications = ({ notifications }) => {
  return (
    <div className="notifications-list">
      {notifications.length > 0 ? (
        notifications.map((note, index) => (
          <div key={index} className="notification-item">
            {note}
          </div>
        ))
      ) : (
        <div className="no-notifications">No notifications</div>
      )}
    </div>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Notifications;

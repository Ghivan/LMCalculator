import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({
                          type = 'info',
                          message,
                          clearMessage
                      }) => {
    if (message) {
        return (
            <div className="modal is-active">
                <div onClick={clearMessage ? clearMessage : null} className="modal-background"/>
                <div className="modal-content">
                    <div className={`notification is-${type}`}>
                        {message}
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
};

Notification.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    clearMessage: PropTypes.func
};

export default Notification;
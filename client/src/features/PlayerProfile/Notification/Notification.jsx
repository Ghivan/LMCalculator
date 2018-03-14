import React from 'react';
import PropTypes from 'prop-types';
import $ from "jquery";

class Notification extends React.Component {
    state = {
        timer: null,
    };

    componentDidMount() {
        $(this.modal).modal('show');
    }

    componentWillUnmount() {
        $(this.modal).modal('hide');
    }


    render() {
        const {
            type = 'info',
            message,
            clearMessage
        } = this.props;

        if (message) {
            return (
                <div ref={ref => {
                    this.modal = ref
                }} className="modal fade show" id="error-modal">
                    <div className="modal-dialog">
                        <div className="modal-body">
                            <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                                {message}
                                <button type="button" className="close"
                                        onClick={e => {
                                            e.preventDefault();
                                            clearMessage();
                                        }
                                        }
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null
        }
    };
}

Notification.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    clearMessage: PropTypes.func,
};

export default Notification;
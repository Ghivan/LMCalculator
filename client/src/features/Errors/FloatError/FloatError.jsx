import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.js';

class FloatError extends React.Component {
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
        const {message} = this.props;
        return (
            <div ref={ref => {
                this.modal = ref
            }} className="modal fade show" id="error-modal">
                <div className="modal-dialog">
                    <div className="modal-body">
                            <div className="alert alert-danger"><b>Ошибка!</b> {message}</div>
                    </div>
                </div>
            </div>
        )

    }
}


FloatError.propTypes = {
    message: PropTypes.string,
    clearError: PropTypes.func
};

export default FloatError;
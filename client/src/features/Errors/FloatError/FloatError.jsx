import React from 'react';
import PropTypes from 'prop-types';

import './css/FloatError.css'

const TIME_TO_SHOW = 2000;

class FloatError extends React.Component {
    state = {
        timer: null
    };

    componentDidMount() {
        const timer = setTimeout(() => {
            if (!this.props.clearError) return;
            this.props.clearError()
        }, TIME_TO_SHOW);
        this.setState({timer})
    }

    clearError = () => {
        if (this.state.timer) {
            clearTimeout(this.state.timer)
        }
        this.setState({timer: null});

        if (!this.props.clearError) return;
        this.props.clearError()
    };

    render() {
        const {message} = this.props;
        return (
            <div className="float-error-container"
                 onClick={this.clearError}
            >
                <div className="float-error alert alert-danger alert-dismissible fade show"
                     role="alert"
                >
                    <strong>Ошибка!</strong> {message}
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
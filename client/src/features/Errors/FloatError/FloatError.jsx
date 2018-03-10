import React from 'react';
import PropTypes from 'prop-types';

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
        if (message){
            return (
                <div className="modal is-active">
                    <div onClick={this.clearError} className="modal-background"/>
                    <div className="modal-content">
                        <article className="message is-danger">
                            <div className="message-header">
                                <p>Ошибка!</p>
                            </div>
                            <div className="message-body">
                                {message}
                            </div>
                        </article>
                    </div>
                </div>
            )
        } else {
            return null
        }

    }
}


FloatError.propTypes = {
    message: PropTypes.string,
    clearError: PropTypes.func
};

export default FloatError;
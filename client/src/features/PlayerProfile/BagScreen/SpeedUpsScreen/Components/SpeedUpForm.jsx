import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import SpeedUpFormColumns from "./SpeedUpFormColumns";
import Notification from "../../../Notification/Notification";

class SpeedUpForm extends React.Component {
    state = {
        speedUps: this.props.speedUps.slice(),
        errors: {},
        notification: {
            message: '',
            type: ''
        },
        timers: []
    };
    resetState = () => {
        this.setNotification('Изменения сброшены', 'warning');
        this.setState({
            speedUps: this.props.speedUps.slice(),
            shouldResetInputs: true,
            errors: {}
        }, () => this.setState({
            shouldResetInputs: false
        }))
    };
    onInputChange = (element) => {
        const value = Number(element.value);
        const name = element.name;
        const speedUps = this.state.speedUps.slice();
        const index = this.state.speedUps.findIndex(speedUp => speedUp.name === name);

        if (isNaN(value) || value % 1 > 0) {
            this.setError(name, 'Целое число больше 0');
            if (index > -1) {
                speedUps.splice(index, 1)
            }
        } else {
            if (value > 0) {
                speedUps.splice(index, index > -1 ? 1 : 0, {
                    name,
                    quantity: Number(value)
                })
            } else if (index > -1) {
                speedUps.splice(index, 1)
            }
            this.clearError(name);
        }

        this.setState({
            speedUps
        })

    };
    updateSpeedUps = () => {
        if (this.hasErrors()) return;
        this.props.updateSpeedUps(this.props.type, this.state.speedUps);
    };
    setError = (field, message) => {
        this.setState({
            errors: {
                ...this.state.errors,
                [field]: message
            }
        })
    };
    clearError = field => {
        this.setState({
            errors: {
                ...this.state.errors,
                [field]: ''
            }
        })
    };
    hasErrors = () => {
        const errors = Object.values(this.state.errors);
        for (let i = 0; i < errors.length; i++) {
            if (errors[i] !== '') {
                return true;
            }
        }
        return false;
    };
    setNotification = (message, type = 'info') => {
        this.setState({
            notification: {
                message,
                type
            }
        });
        const timer = setTimeout(() => {
                this.clearNotification();
                this.state.timers.splice(this.state.timers.indexOf(timer), 1);
                clearTimeout(timer);
            }, 2000
        );
        this.state.timers.push(timer);
    };
    clearNotification = () => {
        this.setState({
            notification: {
                ...this.state.notification,
                message: ''
            }
        })
    };

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.speedUps, this.props.speedUps)) {
            this.setNotification('Изменения сохранены', 'success');
            this.setState({
                speedUps: nextProps.speedUps.slice(),
                shouldResetInputs: true,
                errors: {}
            }, () => this.setState({
                shouldResetInputs: false
            }));
        }
    }

    componentWillUnmount() {
        this.state.timers.map(timer => clearTimeout(timer))
    }

    render() {
        const {
            close
        } = this.props;
        return (
            <div>
                {this.state.notification.message ?
                    <Notification message={this.state.notification.message}
                                  type={this.state.notification.type}
                                  clearMessage={this.clearNotification}
                    /> :
                    null
                }

                <div className="row">
                    <SpeedUpFormColumns speedUps={this.props.speedUps}
                                        onChange={this.onInputChange}
                                        errors={this.state.errors}
                                        shouldResetInputs={this.state.shouldResetInputs}
                    />
                </div>
                <div className="row">
                    <div className="btn btn-group btn-group-sm m-auto">
                        <button className="btn btn-danger"
                                onClick={e => {
                                    e.preventDefault();
                                    close();
                                }}
                        >
                            Назад
                        </button>
                        <button className="btn btn-warning"
                                disabled={isEqual(this.state.speedUps, this.props.speedUps) ? 'is-disabled' : ''}
                                onClick={e => {
                                    e.preventDefault();
                                    this.resetState()
                                }}
                        >
                            Сбросить
                        </button>
                        <button className="btn btn-success"
                                disabled={isEqual(this.state.speedUps, this.props.speedUps) || this.hasErrors() ? 'is-disabled' : ''}
                                onClick={e => {
                                    e.preventDefault();
                                    this.updateSpeedUps();
                                }}
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

SpeedUpForm.propTypes = {
    close: PropTypes.func,
    speedUps: PropTypes.array,
    type: PropTypes.string,
    updateSpeedUps: PropTypes.func.isRequired
};

export default SpeedUpForm;

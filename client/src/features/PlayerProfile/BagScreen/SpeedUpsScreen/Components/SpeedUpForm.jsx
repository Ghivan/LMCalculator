import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import {SPEED_UPS_SOURCE_TYPES} from "../../../../Global/Constants/speedups";
import SpeedUpFormColumns from "./SpeedUpFormColumns";

import Modal from "../../../../Modal/Modal";
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

    componentWillReceiveProps(nextProps){
        if(!isEqual(nextProps.speedUps, this.props.speedUps)){
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

    componentWillUnmount(){
        this.state.timers.map(timer => clearTimeout(timer))
    }

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

    render() {
        const {
            closeModal
        } = this.props;
        const type = this.props.type || 'universal';
        return (
            <div className="modal is-active">
                <Modal>
                    <Notification message={this.state.notification.message}
                                  type={this.state.notification.type}
                                  clearMessage={this.clearNotification}
                    />
                </Modal>
                <div className="modal-background"/>
                <div className="modal-content">
                    <div className="section box ">
                        <div className="columns is-multiline is-centered">
                            <h3>{SPEED_UPS_SOURCE_TYPES[type].label}</h3>
                        </div>
                        <div className="columns is-multiline is-centered is-vertical">
                            <SpeedUpFormColumns speedUps={this.props.speedUps}
                                                onChange={this.onInputChange}
                                                errors={this.state.errors}
                                                shouldResetInputs={this.state.shouldResetInputs}
                            />
                        </div>
                        <div className="columns">
                            <div className="column is-fullwidth ">
                                <div className="buttons  is-centered">
                                    <button className="button is-danger"
                                            onClick={e => {
                                                e.preventDefault();
                                                closeModal();
                                            }}
                                    >
                                        Назад
                                    </button>
                                    <button className="button is-warning"
                                            disabled={isEqual(this.state.speedUps, this.props.speedUps) ? 'is-disabled' : ''}
                                            onClick={e => {
                                                e.preventDefault();
                                                this.resetState()
                                            }}
                                    >
                                        Сбросить
                                    </button>
                                    <button className="button is-success"
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
                    </div>
                </div>
            </div>
        )
    }
}

SpeedUpForm.propTypes = {
    closeModal: PropTypes.func,
    speedUps: PropTypes.array,
    type: PropTypes.string,
    updateSpeedUps: PropTypes.func.isRequired
};

export default SpeedUpForm

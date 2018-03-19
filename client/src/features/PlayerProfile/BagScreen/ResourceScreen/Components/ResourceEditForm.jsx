import React from 'react';
import PropTypes from 'prop-types';

import isEqual from 'lodash/isEqual';
import Notification from "../../../Notification/Notification";
import ResourceEditFormColumns from "./ResourceEditFormColumns";
import {getFormattedNumberOutput} from "../../../../Global/Functions/general";
import {countTotalResources} from "../../../../Global/Functions/resources";

class ResourceEditForm extends React.Component {

    state = {
        errors: {},
        notification: {
            message: '',
            type: ''
        },
        timers: [],
        packs: this.props.packs.slice(),
        shouldResetInputs: false
    };
    resetState = (props = this.props) => {
        this.setState({
            shouldResetInputs: true,
            packs: props.packs.slice(),
            errors: {}
        }, () => this.setState({
            shouldResetInputs: false
        }))
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
    onInputChange = (element) => {
        const value = Number(element.value);
        const name = element.name;
        const packs = this.state.packs.slice();
        const index = this.state.packs.findIndex(pack => pack.label === name);

        if (isNaN(value) || value % 1 > 0) {
            this.setError(name, 'Целое число больше 0');
            if (index > -1) {
                packs.splice(index, 1)
            }
        } else {
            if (value > 0) {
                packs.splice(index, index > -1 ? 1 : 0, {
                    label: name,
                    quantity: value
                })
            } else if (index > -1) {
                packs.splice(index, 1)
            }
            this.clearError(name);
        }

        this.setState({
            packs
        })

    };
    updateResources = () => {
        if (this.hasErrors()) return;
        this.props.updateResources(this.props.type, this.state.packs);
    };

    componentWillUnmount() {
        this.state.timers.map(timer => clearTimeout(timer))
    }

    componentWillReceiveProps(nextProps) {
        this.resetState(nextProps);
        if (!isEqual(this.props.packs, nextProps.packs) && (this.props.type === nextProps.type)) {
            this.setNotification('Изменения сохранены', 'success')
        }
    }

    render() {
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
                    <ResourceEditFormColumns packs={this.state.packs}
                                             errors={this.state.errors}
                                             shouldResetInputs={this.state.shouldResetInputs}
                                             onChange={this.onInputChange}
                    />
                </div>
                <div className="row d-flex justify-content-around">
                    <div className="alert alert-warning text-center m-2">
                        <b>Предыдущее
                            значение:</b><br/> {getFormattedNumberOutput(countTotalResources(this.props.packs))}
                    </div>
                    <div className="alert alert-info text-center m-2">
                        <b>Текущее значение:</b><br/> {getFormattedNumberOutput(countTotalResources(this.state.packs))}
                    </div>
                </div>

                <div className="row">
                    <div className="btn btn-group btn-group m-auto">
                        <button className="btn btn-warning"
                                disabled={!isEqual(this.state.packs, this.props.packs) || this.hasErrors() ? '' : 'is-disabled'}
                                onClick={e => {
                                    e.preventDefault();
                                    this.resetState();
                                    this.setNotification('Изменения сброшены', 'warning');
                                }}
                        >
                            Сбросить
                        </button>
                        <button className="btn btn-success"
                                disabled={isEqual(this.state.packs, this.props.packs) || this.hasErrors() ? 'is-disabled' : ''}
                                onClick={e => {
                                    e.preventDefault();
                                    this.updateResources();
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

ResourceEditForm.propTypes = {
    packs: PropTypes.array.isRequired,
    updateResources: PropTypes.func,
    type: PropTypes.string,
};

export default ResourceEditForm;

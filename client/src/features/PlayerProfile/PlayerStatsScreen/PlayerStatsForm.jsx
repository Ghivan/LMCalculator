import React from 'react';
import PropTypes from "prop-types";
import isEqual from 'lodash/isEqual';
import InputField from "../../Global/Components/InputField/InputField";
import Notification from "../Notification/Notification";

const FIELD_NAMES = {
    TRAINING: 'training',
    RESEARCH: 'research',
    BUILDING: 'building'
};


class PlayerStatsForm extends React.Component {
    state = {
        stats: {
            ...this.props.stats
        },
        errors: {},
        shouldResetInputs: false,
        notification: {
            message: '',
            type: ''
        },
        timers: []
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
    onInputBlur = element => {
        const fieldName = element.name;
        if (this.state.errors[fieldName]) {
            element.select();
        }
    };
    onInputChange = element => {
        const fieldName = element.name;
        const value = element.value;

        this.setFieldValue(fieldName, value);
    };
    setFieldValue = (fieldName, valueToSet) => {
        const value = Number(valueToSet.replace(/,/g, '.'));
        if (value < 0 || isNaN(value)) {
            this.setError(fieldName, 'Число больше 0');
            this.setState({
                [fieldName]: 0
            });
        } else {
            this.clearError(fieldName);
            this.setState({
                stats: {
                    ...this.state.stats,
                    [fieldName]: value
                }
            });
        }
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
    updateStats = () => {
        if (this.hasErrors()) return;
        this.props.updateStats(this.state.stats);
    };
    resetStats = () => {
        this.setNotification('Изменения сброшены', 'warning');
        this.setState({
            stats: {
                ...this.props.stats
            },
            shouldResetInputs: true,
            errors: {}
        }, () => this.setState({
            shouldResetInputs: false
        }))
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
        if (!isEqual(nextProps.stats, this.props.stats)) {
            this.setNotification('Изменения сохранены', 'success');
            this.setState({
                stats: {
                    ...nextProps.stats
                },
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
        const stats = this.state.stats;
        const {toggle} = this.props;

        return (
            <div className="container">
                {this.state.notification.message ?
                    <Notification message={this.state.notification.message}
                                  type={this.state.notification.type}
                                  clearMessage={this.clearNotification}
                    /> :
                    null
                }
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Параметр</th>
                        <th>Значение</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Скорость исследования</td>
                        <td><InputField defaultValue={stats.research}
                                        name={FIELD_NAMES.RESEARCH}
                                        onBlur={this.onInputBlur}
                                        onChange={this.onInputChange}
                                        error={this.state.errors[FIELD_NAMES.RESEARCH]}
                                        shouldReset={this.state.shouldResetInputs}
                        /></td>
                    </tr>
                    <tr>
                        <td>Скорость строительства</td>
                        <td><InputField defaultValue={stats.building}
                                        name={FIELD_NAMES.BUILDING}
                                        onBlur={this.onInputBlur}
                                        onChange={this.onInputChange}
                                        error={this.state.errors[FIELD_NAMES.BUILDING]}
                                        shouldReset={this.state.shouldResetInputs}
                        /></td>
                    </tr>
                    <tr>
                        <td>Скорость тренировки</td>
                        <td><InputField defaultValue={stats.training}
                                        name={FIELD_NAMES.TRAINING}
                                        onBlur={this.onInputBlur}
                                        onChange={this.onInputChange}
                                        error={this.state.errors[FIELD_NAMES.TRAINING]}
                                        shouldReset={this.state.shouldResetInputs}
                        /></td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="2">
                            <div className="btn btn-group float-right">
                                <button className="btn btn-danger"
                                        onClick={e => {
                                            e.preventDefault();
                                            toggle();
                                        }}
                                >
                                    Назад
                                </button>
                                <button className="btn btn-warning"
                                        disabled={isEqual(this.state.stats, this.props.stats) && !this.hasErrors()}
                                        onClick={e => {
                                            e.preventDefault();
                                            this.resetStats();
                                        }}
                                >
                                    Сбросить
                                </button>
                                <button className="btn btn-success"
                                        disabled={isEqual(this.state.stats, this.props.stats) || this.hasErrors()}
                                        onClick={e => {
                                            e.preventDefault();
                                            this.updateStats();
                                        }}
                                >
                                    Сохранить
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

PlayerStatsForm.propTypes = {
    stats: PropTypes.shape({
        research: PropTypes.number,
        building: PropTypes.number,
        training: PropTypes.number
    }),
    toggle: PropTypes.func,
    updateStats: PropTypes.func.isRequired
};

export default PlayerStatsForm;

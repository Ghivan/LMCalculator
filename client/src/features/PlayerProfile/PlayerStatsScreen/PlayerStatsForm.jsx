import React from 'react';
import PropTypes from "prop-types";

import PlayerInputField from "../PlayerInputField";

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
        shouldResetInputs: false
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

    resetStats = () => {
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

    render() {
        const stats = this.state.stats;
        const {toggle} = this.props;

        return (
            <div className="columns is-centered">
                <div className="column is-two-thirds">
                    <table className="table is-hoverable is-striped is-fullwidth">
                        <thead>
                        <tr>
                            <th>Параметр</th>
                            <th>Значение</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Скорость исследования</td>
                            <td><PlayerInputField defaultValue={stats.research}
                                                  name={FIELD_NAMES.RESEARCH}
                                                  onBlur={this.onInputBlur}
                                                  onChange={this.onInputChange}
                                                  error={this.state.errors[FIELD_NAMES.RESEARCH]}
                                                  shouldReset={this.state.shouldResetInputs}
                            /></td>
                        </tr>
                        <
                            tr>
                            <td>Скорость строительства</td>
                            <td><PlayerInputField defaultValue={stats.building}
                                                  name={FIELD_NAMES.BUILDING}
                                                  onBlur={this.onInputBlur}
                                                  onChange={this.onInputChange}
                                                  error={this.state.errors[FIELD_NAMES.BUILDING]}
                                                  shouldReset={this.state.shouldResetInputs}
                            /></td>
                        </tr>
                        <tr>
                            <td>Скорость тренировки</td>
                            <td><PlayerInputField defaultValue={stats.training}
                                                  name={FIELD_NAMES.TRAINING}
                                                  onBlur={this.onInputBlur}
                                                  onChange={this.onInputChange}
                                                  error={this.state.errors[FIELD_NAMES.TRAINING]}
                                                  shouldReset={this.state.shouldResetInputs}
                            /></td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="buttons  is-right">
                        <button className="button is-danger"
                                onClick={e => {
                                    e.preventDefault();
                                    toggle();
                                }}
                        >
                            Отменить
                        </button>
                        <button className="button is-warning"
                                onClick={e => {
                                    e.preventDefault();
                                    this.resetStats();
                                }}
                        >
                            Сбросить
                        </button>
                        <button className="button is-success"
                                onClick={e => {
                                    e.preventDefault();
                                    console.warn(this.state.stats);
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

PlayerStatsForm.propTypes = {
    stats: PropTypes.shape({
        research: PropTypes.number,
        building: PropTypes.number,
        training: PropTypes.number
    }),
    toggle: PropTypes.func
};

export default PlayerStatsForm;

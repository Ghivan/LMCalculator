import React from 'react';
import PropTypes from 'prop-types';

import {RESOURCES_TYPE} from '../../Constants/resources';
import {TROOPS_TIERS, TROOPS_COST, TROOPS_MIGHT, TROOPS_TRAINING_TIME} from '../../Constants/troops';
import CalculatorInputField from "./CalculatorInputField";

class TroopsCalculatorRow extends React.Component {

    state = {
        [TROOPS_TIERS.T1]: 0,
        [TROOPS_TIERS.T2]: 0,
        [TROOPS_TIERS.T3]: 0,
        [TROOPS_TIERS.T4]: 0,
        class: this.props.class,
        errors: {}
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
        const tier = element.name;
        const value = Number(element.value);

        if (value < 0 || isNaN(value) || (value % 1 !== 0)) {
            this.setError(tier, 'Целое число больше 0');
            this.setState({
                [tier]: 0
            }, () => this.synchronize());
        } else {
            this.clearError(tier);
            this.setState({
                [tier]: value
            }, () => this.synchronize());
        }
    };

    getTotalTrainingTime = () => {
        return Object.values(TROOPS_TIERS).reduce((acc, curr) => {
            return acc + this.state[curr]*TROOPS_TRAINING_TIME[curr]
        }, 0);
    };

    getTotalMight = () => {
        return Object.values(TROOPS_TIERS).reduce((acc, curr) => {
            return acc + this.state[curr]*TROOPS_MIGHT[curr]
        }, 0);
    };

    getTotalResources = () => {
       const troopsCost = TROOPS_COST[this.state.class];
       const total = Object.values(RESOURCES_TYPE).reduce((acc, curr)=> {
           acc[curr] = 0;
           return acc;
       }, {});
       Object.values(RESOURCES_TYPE).map(resource => {
           return Object.values(TROOPS_TIERS).map(tier => {
               return total[resource] += troopsCost[tier][resource]*this.state[tier] || 0
           })
       });
       return total;
    };

    synchronize = () => {
        this.props.setTime(this.state.class, this.getTotalTrainingTime());
        this.props.setMight(this.state.class, this.getTotalMight());
        this.props.setResources(this.state.class, this.getTotalResources());
    };

    render() {
        const {
            title,
            icon = "fa-male"
        } = this.props;
        return (
            <tr>
                <td>
                    {title}
                </td>
                <td>
                    <CalculatorInputField icon={icon}
                                          name={TROOPS_TIERS.T1}
                                          defaultValue={this.state[TROOPS_TIERS.T1]}
                                          error={this.state.errors[TROOPS_TIERS.T1]}
                                          onChange={this.onInputChange}
                                          onBlur={this.onInputBlur}
                    />
                </td>
                <td>
                    <CalculatorInputField icon={icon}
                                          name={TROOPS_TIERS.T2}
                                          defaultValue={this.state[TROOPS_TIERS.T2]}
                                          error={this.state.errors[TROOPS_TIERS.T2]}
                                          onChange={this.onInputChange}
                                          onBlur={this.onInputBlur}
                    />
                </td>
                <td>
                    <CalculatorInputField icon={icon}
                                          name={TROOPS_TIERS.T3}
                                          defaultValue={this.state[TROOPS_TIERS.T3]}
                                          error={this.state.errors[TROOPS_TIERS.T3]}
                                          onChange={this.onInputChange}
                                          onBlur={this.onInputBlur}
                    />
                </td>
                <td>
                    <CalculatorInputField icon={icon}
                                          name={TROOPS_TIERS.T4}
                                          defaultValue={this.state[TROOPS_TIERS.T4]}
                                          error={this.state.errors[TROOPS_TIERS.T4]}
                                          onChange={this.onInputChange}
                                          onBlur={this.onInputBlur}
                    />
                </td>
            </tr>
        )
    }
}

TroopsCalculatorRow.propTypes = {
    title: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    icon: PropTypes.string,
    setMight: PropTypes.func.isRequired,
    setResources: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired
};

export default TroopsCalculatorRow;
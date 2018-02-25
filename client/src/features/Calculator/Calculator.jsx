import React from 'react';
import TimeDisplay from "./Components/TimeDisplay";
import {countTimeWithHelp, countTimeWithSpeedBonus} from "./helpers/functions";
import InputField from "./Components/InputField";

const FIELD_NAMES = {
    HELP_QUANTITY: 'helpQuantity'
};

class Calculator extends React.Component {
    state = {
        seconds: 5643333,
        speedBonus: 0,
        [FIELD_NAMES.HELP_QUANTITY]: 12,
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
                [field]:''
            }
        })
    };

    onInputBlur = element => {
        const fieldName = element.name;
        if (this.state.errors[fieldName]){
            element.select();
        }
    };

    onInputChange = element => {
        const fieldName = element.name;
        const value = element.value;

        switch (fieldName) {
            case FIELD_NAMES.HELP_QUANTITY:
                this.setHelpQuantityField(value);
                break;
        }
    };

    setHelpQuantityField = valueToValidate => {
        const value = Number(valueToValidate.replace(/,/g, '\.'));
        if (value < 0 || value > 30 || isNaN(value) || (value % 1 !== 0)) {
            this.setError(FIELD_NAMES.HELP_QUANTITY, 'Количество помощи должно быть целым числом от 0 до 30');
            this.setState({
                [FIELD_NAMES.HELP_QUANTITY]: 0
            });
        } else {
            this.clearError(FIELD_NAMES.HELP_QUANTITY);
            this.setState({
                [FIELD_NAMES.HELP_QUANTITY]: value
            });
        }

    };

    render() {
        const timeWithSpeedBonus = countTimeWithSpeedBonus(this.state.seconds, this.state.speedBonus);
        const timeWithHelp = countTimeWithHelp(timeWithSpeedBonus, this.state[FIELD_NAMES.HELP_QUANTITY]);
        return (
            <div className='container'>
                <InputField name={FIELD_NAMES.HELP_QUANTITY}
                           defaultValue={this.state[FIELD_NAMES.HELP_QUANTITY]}
                           error={this.state.errors[FIELD_NAMES.HELP_QUANTITY]}
                           onChange={this.onInputChange}
                            onBlur={this.onInputBlur}
                           label="Количество помощи:"
               />

                <TimeDisplay title='Исходное время:'
                             seconds={this.state.seconds}
                />
                <TimeDisplay title='Фактическое время:'
                             seconds={!this.state.errorMessage ? timeWithSpeedBonus : null}
                />
                <TimeDisplay title='Время после помощи:'
                             seconds={!this.state.errorMessage ? timeWithHelp : null}/>
            </div>
        )
    }
}

export default Calculator;

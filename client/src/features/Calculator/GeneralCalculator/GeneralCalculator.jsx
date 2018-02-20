import React from 'react';

import TimeDisplay from '../GlobalCalculatorComponents/TimeDisplay';
import DisplaySection from '../GlobalCalculatorComponents/DisplaySection';
import {countTimeWithHelp, countTimeWithSpeedBonus, TimeTransformer} from '../utils/functions';
import {FIELD_NAMES} from "../utils/constants";


class GeneralCalculator extends React.Component {

    constructor(props) {
        super(props);
        const speedBonus = 332;
        const helpNumber = 30;
        const InitialTime = new TimeTransformer(36000);
        const TimeWithSpeedBonus = new TimeTransformer(countTimeWithSpeedBonus(InitialTime.toSeconds(), speedBonus));
        const TimeWithHelp = new TimeTransformer(countTimeWithHelp(TimeWithSpeedBonus.toSeconds(), helpNumber));
        this.state = {
            [FIELD_NAMES.SPEED_BONUS]: speedBonus,
            [FIELD_NAMES.HELP_NUMBER]: helpNumber,
            initialTime: {
                ...InitialTime
            },
            timeWithBonus: {
                ...TimeWithSpeedBonus
            },
            timeWithHelp: {
                ...TimeWithHelp
            }
        };
    }

    syncTime() {
        const InitialTime =  new TimeTransformer(this.toSeconds('initialTime'));
        const TimeWithSpeedBonus = new TimeTransformer(countTimeWithSpeedBonus(InitialTime.toSeconds(), this.state[FIELD_NAMES.SPEED_BONUS]));
        const TimeWithHelp = new TimeTransformer(countTimeWithHelp(TimeWithSpeedBonus.toSeconds(), this.state[FIELD_NAMES.HELP_NUMBER]));
        this.setState({
            initialTime: {
                ...InitialTime
            },
            timeWithBonus: {
                ...TimeWithSpeedBonus
            },
            timeWithHelp: {
                ...TimeWithHelp
            }
        })
    }

    setInputHandler(stateField) {
        return (e) => {
            const value = parseInt(e.target.value) || 0;
            const name = e.target.name;
            if (stateField) {
                this.setState({
                    [stateField]: {
                        ...this.state[stateField],
                        [name]: value
                    }
                }, () => this.syncTime())
            } else {
                this.setState({
                    [name]: value
                }, () => this.syncTime())
            }
        }
    }

    toSeconds(stateField) {
        return this.state[stateField].days * 60 * 60 * 24 +
            this.state[stateField].hours * 60 * 60 +
            this.state[stateField].minutes * 60 +
            this.state[stateField].seconds
    }

    render() {
        return (
            <div className='container'>
                <div className="row p-1">
                    <DisplaySection label='Бонус скорости:'
                                    value={this.state[FIELD_NAMES.SPEED_BONUS]}
                                    name={FIELD_NAMES.SPEED_BONUS}
                                    onChange={this.setInputHandler()}
                    />
                    <DisplaySection label='Количество помощи:'
                                    value={this.state[FIELD_NAMES.HELP_NUMBER]}
                                    name={FIELD_NAMES.HELP_NUMBER}
                                    onChange={this.setInputHandler()}
                    />
                </div>
                <div className="row p-1">
                    <h2>Исходное время:</h2>
                    <TimeDisplay totalSeconds={this.toSeconds('initialTime')}
                                 onInputChange={this.setInputHandler('initialTime')}
                    />
                </div>
                <div className="row p-1">
                    <h2>Фактическое время: </h2>
                    <TimeDisplay totalSeconds={
                        this.toSeconds('timeWithBonus')
                    }/>
                </div>

                <div className="row p-1">
                    <h2>Время после помощи: </h2>
                    <TimeDisplay totalSeconds={
                        this.toSeconds('timeWithHelp')
                    }/>
                </div>
            </div>
        )
    }
}

export default GeneralCalculator

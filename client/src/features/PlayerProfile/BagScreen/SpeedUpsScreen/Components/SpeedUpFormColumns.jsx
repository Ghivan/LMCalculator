import React from 'react';

import InputField from "../../../../Global/Components/InputField/InputField";
import {SPEED_UPS_TIME_TYPES} from "../../../../Global/Constants/speedups";
import SpeedUpDisplayBox from "./SpeedUpDisplayBox";
import PropTypes from "prop-types";

const SpeedUpFormColumns = ({
                                speedUps,
                                onChange,
                                errors,
                                shouldResetInputs = false,
                                onBlur,
                                onFocus
                            }) => {
    const COLUMN_LENGTH = 7;
    const columns = Object.keys(SPEED_UPS_TIME_TYPES).reduce((acc, curr) => {
        if (acc.length === 0 || acc[acc.length - 1].length === COLUMN_LENGTH) {
            acc.push([])
        }
        acc[acc.length - 1].push(curr);
        return acc;
    }, []);

    return (
        columns.map((column, index) => {
            return (
                <div className="column"
                     key={index}
                >
                    {column.map((item, index) => {
                        const currSpeedUp = speedUps.find(speedUp => speedUp.name === item);
                        return (
                            <InputField addon={`${SPEED_UPS_TIME_TYPES[item].label}:`}
                                        defaultValue={currSpeedUp ? currSpeedUp.quantity : 0}
                                        error={errors[item]}
                                        name={item}
                                        onChange={onChange ? onChange : null}
                                        key={index}
                                        shouldReset={shouldResetInputs}
                            />
                        )
                    })}
                </div>
            )
        })
    )
};

SpeedUpDisplayBox.propTypes = {
    speedUps: PropTypes.array,
    errors: PropTypes.object,
    shouldResetInputs: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
};

export default SpeedUpFormColumns;
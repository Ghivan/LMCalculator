import React from 'react';
import DisplaySection from './DisplaySection';
import PropTypes from "prop-types";

import {TimeTransformer} from '../utils/functions';
import {FIELD_NAMES} from '../utils/constants';

const TimeDisplay = (
    {
        totalSeconds = 0,
        onInputChange,
        onInputBlur,
        onInputFocus
    }
) => {
    const Time = new TimeTransformer(totalSeconds);

    return (
        <form>
            <div className="form-row">
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <DisplaySection label='Дни:'
                                    value={Time.days}
                                    name={FIELD_NAMES.DAYS}
                                    onChange={onInputChange ? onInputChange : null}
                                    onBlur={onInputBlur ? onInputBlur : null}
                                    onFocus={onInputFocus ? onInputFocus : null}
                    />
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <DisplaySection label='Часы:'
                                    value={Time.hours}
                                    name={FIELD_NAMES.HOURS}
                                    onChange={onInputChange ? onInputChange : null}
                                    onBlur={onInputBlur ? onInputBlur : null}
                                    onFocus={onInputFocus ? onInputFocus : null}
                    />
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <DisplaySection label='Минуты:'
                                    value={Time.minutes}
                                    name={FIELD_NAMES.MINUTES}
                                    onChange={onInputChange ? onInputChange : null}
                                    onBlur={onInputBlur ? onInputBlur : null}
                                    onFocus={onInputFocus ? onInputFocus : null}
                    />
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <DisplaySection label='Секунды:'
                                    value={Time.seconds}
                                    name={FIELD_NAMES.SECONDS}
                                    onChange={onInputChange ? onInputChange : null}
                                    onBlur={onInputBlur ? onInputBlur : null}
                                    onFocus={onInputFocus ? onInputFocus : null}
                    />
                </div>
            </div>
        </form>
    )
};

TimeDisplay.propTypes = {
    totalSeconds: PropTypes.number,
    onInputChange: PropTypes.func,
    onInputBlur: PropTypes.func,
    onInputFocus: PropTypes.func
};

export default TimeDisplay;
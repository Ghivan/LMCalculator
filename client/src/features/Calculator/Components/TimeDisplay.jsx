import React from 'react';
import PropType from 'prop-types';

import {getFormattedTime, getRightWordForm} from "../helpers/functions";

const TimeDisplay = ({seconds = 0, title = ''}) => {
    const formattedTime = getFormattedTime(seconds);
    return (
        <div className="row">
            <div className="col-3 text-right">
                <h6>{title}</h6>
            </div>
            <div className="col-9">
                <ul className="list-inline">
                    <li className="list-inline-item">
                        {formattedTime.days} {getRightWordForm(formattedTime.days).days}
                    </li>
                    <li className="list-inline-item">
                        {formattedTime.hours} {getRightWordForm(formattedTime.hours).hours}
                    </li>
                    <li className="list-inline-item">
                        {formattedTime.minutes} {getRightWordForm(formattedTime.minutes).minutes}
                    </li>
                    <li className="list-inline-item">
                        {formattedTime.seconds} {getRightWordForm(formattedTime.seconds).seconds}
                    </li>
                </ul>
            </div>
        </div>
    )
};

TimeDisplay.propTypes = {
    seconds: PropType.number,
    title: PropType.string
};

export default TimeDisplay;
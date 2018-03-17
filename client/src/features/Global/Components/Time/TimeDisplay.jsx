import React from 'react';
import PropType from 'prop-types';

import {getFormattedTime, getRightWordForm} from "../../Functions/general";

const TimeDisplay = ({seconds = 0, title = '', color = 'warning'}) => {
    const formattedTime = getFormattedTime(seconds);
    return (
        <div className={`alert alert-${color} w-100 m-auto`}>
            <div className="h6">
                {title}
            </div>
            <div>
                <span><b>{formattedTime.days}</b> {getRightWordForm(formattedTime.days).days}</span>
                <span> <b>{formattedTime.hours}</b> {getRightWordForm(formattedTime.hours).hours}</span>
                <span> <b>{formattedTime.minutes}</b> {getRightWordForm(formattedTime.minutes).minutes}</span>
                <span> <b>{formattedTime.seconds}</b> {getRightWordForm(formattedTime.seconds).seconds}</span>
            </div>
        </div>
    )
};

TimeDisplay.propTypes = {
    seconds: PropType.number,
    title: PropType.string,
    color: PropType.string
};

export default TimeDisplay;
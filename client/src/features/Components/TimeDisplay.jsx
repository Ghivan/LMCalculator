import React from 'react';
import PropType from 'prop-types';

import {getFormattedTime, getRightWordForm} from "../helpers/functions";

const TimeDisplay = ({seconds = 0, title = '', color = 'warning'}) => {
    const formattedTime = getFormattedTime(seconds);
    return (
        <article className={`message is-${color}`}>
            <div className="message-header">
                <p>{title}</p>
            </div>
            <div className="message-body has-text-centered">
                <span><b>{formattedTime.days}</b> {getRightWordForm(formattedTime.days).days}</span>
                <span> <b>{formattedTime.hours}</b> {getRightWordForm(formattedTime.hours).hours}</span>
                <span> <b>{formattedTime.minutes}</b> {getRightWordForm(formattedTime.minutes).minutes}</span>
                <span> <b>{formattedTime.seconds}</b> {getRightWordForm(formattedTime.seconds).seconds}</span>
            </div>
        </article>
    )
};

TimeDisplay.propTypes = {
    seconds: PropType.number,
    title: PropType.string,
    color: PropType.string
};

export default TimeDisplay;
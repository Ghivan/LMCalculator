import React from 'react';
import PropTypes from 'prop-types';

import {SPEED_UPS_SOURCE_TYPES, SPEED_UPS_TIME_TYPES} from "../../../../Global/Constants/speedups";
import {getFormattedTime, getRightWordForm} from "../../../../Global/Functions/general";

const SpeedUpDisplayBox = (
    {
        speedUps = [],
        type,
        showEditForm
    }
) => {
    const formattedTime = getFormattedTime(speedUps.reduce((prev, curr) => {
        return prev + curr.quantity * SPEED_UPS_TIME_TYPES[curr.name].seconds
    }, 0));

    speedUps.sort((a,b) => {
        return SPEED_UPS_TIME_TYPES[a.name].seconds > SPEED_UPS_TIME_TYPES[b.name].seconds ? 1 : -1;
    });

    return (
        <div className="column">
            <div className="card">
                <header className="card-header">
                    <div className="card-header-title message is-info">

                        {SPEED_UPS_SOURCE_TYPES[type].label}
                        <span className="tag">
                                        <button className="button is-primary is-small"
                                                onClick={() => showEditForm(type)}
                                        >Редактировать</button>
                                    </span>
                    </div>
                </header>
                <div className="card-content">
                    <div className="content">
                        <div className="columns is-multiline is-centered">
                            {speedUps.map((speedUp, index) => {
                                return (
                                    <div key={index} className="column is-2 has-text-centered">
                                        <div className="box"
                                             style={{
                                                 position: 'relative'
                                             }}
                                        >
                                            {SPEED_UPS_TIME_TYPES[speedUp.name].label}
                                        <span className="tag is-success has-text-weight-bold"
                                              style={{
                                                  position: 'absolute',
                                                  top: -15,
                                                  right: -15
                                              }}
                                        >х{speedUp.quantity}</span>
                                        </div>
                                    </div>
                                )
                            })}
                            {speedUps.length === 0 ? <div className="has-text-centered">Отстутствуют</div> : null}
                        </div>

                    </div>
                </div>
                <footer className="card-footer message is-info">
                    <div className="section">
                        <span>Всего: </span>
                        <span><b>{formattedTime.days}</b> {getRightWordForm(formattedTime.days).days}</span>
                        <span> <b>{formattedTime.hours}</b> {getRightWordForm(formattedTime.hours).hours}</span>
                        <span> <b>{formattedTime.minutes}</b> {getRightWordForm(formattedTime.minutes).minutes}</span>
                        <span> <b>{formattedTime.seconds}</b> {getRightWordForm(formattedTime.seconds).seconds}</span>
                    </div>
                </footer>
            </div>
        </div>
    )
};

SpeedUpDisplayBox.propTypes = {
    speedUps: PropTypes.array,
    type: PropTypes.string.isRequired,
    showEditForm: PropTypes.func
};

export default SpeedUpDisplayBox;
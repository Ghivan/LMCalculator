import React from 'react';
import PropTypes from 'prop-types';

import {SPEED_UPS_SOURCE_TYPES, SPEED_UPS_TIME_TYPES} from "../../../../Global/Constants/speedups";
import {getFormattedNumberOutput, getFormattedTime, getRightWordForm} from "../../../../Global/Functions/general";
import SpeedUpsVitrine from "./SpeedUpsVitrine";
import SpeedUpForm from "./SpeedUpForm";

import './css/SpeedUpDisplayBox.css';

class SpeedUpDisplayBox extends React.Component {
    state = {
        editMode: false
    };

    toggleEditMode = () => {
        this.setState({editMode: !this.state.editMode})
    };

    render() {
        const {
            speedUps = [],
            type,
            previous,
            next
        } = this.props;
        const formattedTime = getFormattedTime(speedUps.reduce((prev, curr) => {
            return prev + curr.quantity * SPEED_UPS_TIME_TYPES[curr.name].seconds
        }, 0));

        speedUps.sort((a, b) => {
            return SPEED_UPS_TIME_TYPES[a.name].seconds > SPEED_UPS_TIME_TYPES[b.name].seconds ? 1 : -1;
        });

        return (
            <div className="card text-center m-2">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center flex-nowrap">
                        {
                            !this.state.editMode ?
                                <button className="btn btn-switch"
                                        disabled={this.state.editMode}
                                        onClick={() => {
                                            previous()
                                        }}
                                >
                                    <i className="fas fa-arrow-alt-circle-left"/>
                                </button> :
                                null
                        }
                        <p className="text-center font-weight-bold align-middle p-1 m-0">{SPEED_UPS_SOURCE_TYPES[type].label}</p>
                        {
                            !this.state.editMode ?
                                <button className="btn btn-switch"
                                        onClick={() => next()}
                                >
                                    <i className="fas fa-arrow-alt-circle-right"/>
                                </button> :
                                null
                        }
                    </div>
                </div>
                <div className="card-body">
                    {this.state.editMode ?
                        <SpeedUpForm speedUps={speedUps.slice()}
                                     updateSpeedUps={this.props.updateSpeedUps}
                                     type={type}
                                     close ={this.toggleEditMode}
                        /> :
                        <SpeedUpsVitrine speedUps={speedUps} showEditForm={this.toggleEditMode}/>
                    }
                </div>
                <div className="card-footer text-muted">
                    <span>Всего: </span>
                    <span><b>{getFormattedNumberOutput(formattedTime.days)}</b> {getRightWordForm(formattedTime.days).days}</span>
                    <span> <b>{formattedTime.hours}</b> {getRightWordForm(formattedTime.hours).hours}</span>
                    <span> <b>{formattedTime.minutes}</b> {getRightWordForm(formattedTime.minutes).minutes}</span>
                    <span> <b>{formattedTime.seconds}</b> {getRightWordForm(formattedTime.seconds).seconds}</span>
                </div>
            </div>
        )
    };
}

SpeedUpDisplayBox.propTypes = {
    speedUps: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired
};

export default SpeedUpDisplayBox;
import React from 'react';
import PropTypes from 'prop-types';

import {SPEED_UPS_TIME_TYPES} from "../../../../Global/Constants/speedups";

class SpeedUpsVitrine extends React.Component {
    state = {
        animation: ''
    };

    componentDidMount(){
       this.animate();
    }

    componentWillReceiveProps(){
        this.animate()
    }

    animate(){
        if (this.state.timer) clearTimeout(this.state.timer);
        this.setState({
            animation: 'animated',
            timer: setTimeout(()=> this.setState({animation: ''}), 400)
        })
    }
    render(){
        const {
            speedUps = [],
            showEditForm
        } = this.props;
        return (
            <div className="container">
                <div className="row flex-row align-items-center justify-content-center">
                    {speedUps.map((speedUp, index) => {
                        return (
                            <div className={`alert alert-success m-2 p-2 ${this.state.animation}`} key={index}>
                                <b>{SPEED_UPS_TIME_TYPES[speedUp.name].label}</b> <span
                                className="badge badge-light">х{speedUp.quantity}</span>
                            </div>
                        )
                    })}
                    {speedUps.length === 0 ? <div className="has-text-centered">Отстутствуют</div> : null}
                </div>
                <div className="row pl-3 pr-3 pt-2">
                    <button className="btn btn-success btn-sm btn-block float-right"
                            onClick={() => showEditForm()}
                    >Редактировать
                    </button>
                </div>
            </div>
        )
    };
}

SpeedUpsVitrine.propTypes = {
    speedUps: PropTypes.array,
    showEditForm: PropTypes.func
};

export default SpeedUpsVitrine;
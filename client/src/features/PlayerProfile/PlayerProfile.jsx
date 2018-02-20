import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

class PlayerProfile extends React.Component {

    render() {
        const {details} = this.props.player;
        const {logout} = this.props;

        if (isEmpty(details)) return <span className="font-weight-bold font-italic">Загрузка...</span>;
        return (
            <div className="card m-1">
                <div className="card-header">
                    Игровой профиль <span className="font-weight-bold font-italic">
                {details.nickname}
                </span>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-12 justify-content-sm-center">
                            <img src={details.avatar}
                                 className="img-fluid rounded mx-auto d-block p-1"
                                 alt="Аватар игрока"/>
                            <div>
                                <a className="btn btn-sm btn-success btn-block p-1"
                                   href="#"
                                >
                                    Редактировать профиль
                                </a>
                                <a className="btn btn-sm btn-danger btn-block p-1"
                                   href="#"
                                   onClick={e => {
                                       e.preventDefault();
                                       logout();
                                   }}
                                >
                                    Выйти из профиля
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-12">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    Скорость исследования: <b>{details.stats.research} %</b>
                                </li>
                                <li className="list-group-item">
                                    Скорость строительства: <b>{details.stats.building} %</b>
                                </li>
                                <li className="list-group-item">
                                    Скорость тренировки: <b>{details.stats.training} %</b>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PlayerProfile.propTypes ={
    logout: PropTypes.func,
    player: PropTypes.shape({
        id: PropTypes.string,
        details: PropTypes.shape({
            nickname: PropTypes.string,
            avatar: PropTypes.string,
            stats: PropTypes.shape({
                research: PropTypes.number,
                building: PropTypes.number,
                training: PropTypes.number
            })
        })
    })
};

export default PlayerProfile

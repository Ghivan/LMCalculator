import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

class PlayerProfile extends React.Component {

    render() {
        const {details} = this.props.player;
        const {logout} = this.props;

        if (isEmpty(details)) return <span className="font-weight-bold font-italic">Загрузка...</span>;
        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-3">
                        <figure className="image">
                            <img src={details.avatar}
                                 className="image"
                                 alt="Аватар игрока"/>
                        </figure>
                        <div className="section">
                            <div className="buttons  is-centered">
                                <button className="button is-success">
                                    Редактировать профиль
                                </button>

                                <button className="button is-danger"
                                        onClick={e => {
                                            e.preventDefault();
                                            logout();
                                        }}
                                >
                                    Выйти из профиля
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="column is-8">
                        <table className="table is-fullwidth is-hoverable is-striped">
                            <thead>
                            <tr>
                                <th>Параметр</th>
                                <th>Значение</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Скорость исследования</td>
                                <td>{details.stats.research} %</td>
                            </tr>
                            <
                                tr>
                                <td>Скорость строительства</td>
                                <td>{details.stats.building} %</td>
                            </tr>
                            <tr>
                                <td>Скорость тренировки</td>
                                <td>{details.stats.training} %</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

PlayerProfile.propTypes = {
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

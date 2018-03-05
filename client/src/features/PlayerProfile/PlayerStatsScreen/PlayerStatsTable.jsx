import React from 'react';
import PropTypes from 'prop-types';

const PlayerStatsTable = ({stats, toggle}) => {
    return (
        <div className="columns is-centered">
            <div className="column is-two-thirds">
                <table className="table is-hoverable is-striped is-fullwidth">
                    <thead>
                    <tr>
                        <th>Параметр</th>
                        <th>Значение</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Скорость исследования</td>
                        <td>{stats.research} %</td>
                    </tr>
                    <
                        tr>
                        <td>Скорость строительства</td>
                        <td>{stats.building} %</td>
                    </tr>
                    <tr>
                        <td>Скорость тренировки</td>
                        <td>{stats.training} %</td>
                    </tr>
                    </tbody>
                </table>
                <div className="buttons  is-right">
                    <button className="button is-info"
                            onClick={e => {
                                e.preventDefault();
                                toggle();
                            }}
                    >
                        Изменить
                    </button>
                </div>
            </div>
        </div>
    )
};

PlayerStatsTable.propTypes = {
    stats: PropTypes.shape({
        research: PropTypes.number,
        building: PropTypes.number,
        training: PropTypes.number
    }),
    toggle: PropTypes.func
};

export default PlayerStatsTable;
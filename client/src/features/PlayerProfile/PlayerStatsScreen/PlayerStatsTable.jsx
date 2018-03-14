import React from 'react';
import PropTypes from 'prop-types';

const PlayerStatsTable = ({stats, toggle}) => {
    return (
        <table className="table table-striped table-hover">
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
            <tfoot>
            <tr>
                <td colSpan="2">
                    <button className="btn btn-info float-right"
                            onClick={e => {
                                e.preventDefault();
                                toggle();
                            }}
                    >
                        Изменить
                    </button>
                </td>
            </tr>
            </tfoot>
        </table>
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
import React from 'react';
import PropTypes from 'prop-types';

import {RESOURCES_TYPE} from "../../Constants/resources";
import {getFormattedNumberOutput} from "../../Functions/general";
import {countTotalResources} from "../../Functions/resources";

const ResourcesDisplayBox = (
    {
        resources,
        title = 'Ресурсы'
    }
) => {

    return (
        <div className="row p-2">
            <div className="card w-75 m-auto">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Тип ресурса</th>
                            <th>Количество</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(RESOURCES_TYPE).map((type, index) => {
                            return (
                                <tr key={index}>
                                    <td>{RESOURCES_TYPE[type]}</td>
                                    <td>{getFormattedNumberOutput(countTotalResources(resources[type]))}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

ResourcesDisplayBox.propTypes = {
    title: PropTypes.string,
    resources: PropTypes.shape({
        [RESOURCES_TYPE.FOOD]: PropTypes.number,
        [RESOURCES_TYPE.TIMBER]: PropTypes.number,
        [RESOURCES_TYPE.STONE]: PropTypes.number,
        [RESOURCES_TYPE.ORE]: PropTypes.number,
        [RESOURCES_TYPE.GOLD]: PropTypes.number
    })
};

export default ResourcesDisplayBox;

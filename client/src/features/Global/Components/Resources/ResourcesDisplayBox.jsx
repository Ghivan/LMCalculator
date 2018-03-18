import React from 'react';
import PropTypes from 'prop-types';
import {RESOURCES_TYPE} from "../../Constants/resources";
import {getFormattedNumberOutput} from "../../Functions/general";

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
                        <tr>
                            <td>Еда:</td>
                            <td>{getFormattedNumberOutput(resources[RESOURCES_TYPE.FOOD])}</td>
                        </tr>
                        <tr>
                            <td>Дерево:</td>
                            <td>{getFormattedNumberOutput(resources[RESOURCES_TYPE.TIMBER])}</td>
                        </tr>
                        <tr>
                            <td>Камень:</td>
                            <td>{getFormattedNumberOutput(resources[RESOURCES_TYPE.STONE])}</td>
                        </tr>
                        <tr>
                            <td>Руда:</td>
                            <td>{getFormattedNumberOutput(resources[RESOURCES_TYPE.ORE])}</td>
                        </tr>
                        <tr>
                            <td>Золото:</td>
                            <td>{getFormattedNumberOutput(resources[RESOURCES_TYPE.GOLD])}</td>
                        </tr>
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

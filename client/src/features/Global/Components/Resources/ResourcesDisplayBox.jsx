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
        <div>
            <article className="message is-warning">
                <div className="message-header">
                    <p>{title}</p>
                </div>
                <div className="message-body is-centered">
                    <table className="table is-striped is-fullwidth">
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
            </article>
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

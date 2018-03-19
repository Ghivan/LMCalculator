import React from 'react';
import PropTypes from 'prop-types';
import {RESOURCES_TYPE} from "../../../../Global/Constants/resources";

import "./css/ResourceEditScreen.css";
import ResourceEditForm from "./ResourceEditForm";

class ResourceEditScreen extends React.Component {
    constructor(props) {
        super(props);
        const resourceTypes = Object.keys(RESOURCES_TYPE);
        this.state = {
            index: 0,
            resourceTypes,
            currentType: resourceTypes[0]
        }
    }
    nextType = () => {
        const nextIndex = (this.state.index + 1 < this.state.resourceTypes.length) ? this.state.index + 1 : 0;
        const nextType = this.state.resourceTypes[nextIndex];
        this.setState({
            index: nextIndex,
            currentType: nextType
        })
    };
    previousType = () => {
        const previousIndex = (this.state.index - 1 >= 0) ? this.state.index - 1 : this.state.resourceTypes.length - 1;
        const previousType = this.state.resourceTypes[previousIndex];
        this.setState({
            index: previousIndex,
            currentType: previousType
        })

    };

    render() {
        return (
            <div className="card text-center m-2">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center flex-nowrap">
                        <button className="btn btn-switch"
                                disabled={this.state.editMode}
                                onClick={() => {
                                    this.previousType()
                                }}
                        >
                            <i className="fas fa-arrow-alt-circle-left"/>
                        </button>
                        <p className="text-center font-weight-bold align-middle p-1 m-0">{RESOURCES_TYPE[this.state.currentType]}</p>

                        <button className="btn btn-switch"
                                onClick={() => this.nextType()}
                        >
                            <i className="fas fa-arrow-alt-circle-right"/>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <ResourceEditForm
                        packs={Array.isArray(this.props.resources[this.state.currentType]) ? this.props.resources[this.state.currentType].slice() : []}
                        type={this.state.currentType}
                        updateResources={this.props.updateResources}
                    />
                </div>
            </div>
        )
    }
}

ResourceEditScreen.propTypes = {
    resources: PropTypes.object.isRequired,
    updateResources: PropTypes.func.isRequired
};


export default ResourceEditScreen;
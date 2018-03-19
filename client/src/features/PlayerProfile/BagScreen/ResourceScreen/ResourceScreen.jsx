import React from 'react';
import PropTypes from 'prop-types';

import ResourcesDisplayBox from "../../../Global/Components/Resources/ResourcesDisplayBox";
import ResourceEditScreen from "./Components/ResourcesEditScreen";

class ResourceScreen extends React.Component {
    toggleEditMode = () => {
        this.setState({editMode: !this.state.editMode})
    };

    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        }
    }

    render() {
        return (
            <div className="row p-2">
                <div className="col-12">
                    {this.state.editMode ?
                        <ResourceEditScreen resources={this.props.resources}
                                            updateResources={this.props.updateResources}
                        /> :
                        <ResourcesDisplayBox resources={this.props.resources}/>
                    }
                </div>
                <div className="col-12">
                    <div className="row p-2">
                        <button
                            className={`btn ${this.state.editMode ? 'btn-danger' : 'btn-success'} btn-block btn-sm`}
                            onClick={() => this.toggleEditMode()}
                        >{this.state.editMode ? 'Назад' : 'Редактировать'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

ResourceScreen.propTypes = {
    resources: PropTypes.object.isRequired,
    updateResources: PropTypes.func
};

export default ResourceScreen;

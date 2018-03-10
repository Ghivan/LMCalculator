import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
    state = {
        isActive: false
    };

    triggerDropdown = () => {
        this.setState({
            isActive: !this.state.isActive
        });
    };

    render() {
        const {label, items, onItemClick} = this.props;
        return (
            <div className={`dropdown ${this.state.isActive ? 'is-active' : ''}`}>
                <div className="dropdown-trigger">
                    <button className="button"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu"
                            onClick={this.triggerDropdown}
                    >
                        <span>{label}</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"/>
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {items.map((item, index) => {
                            return (
                                <a href="/this"
                                   className="dropdown-item"
                                   key={index}
                                   onClick={e => {
                                       e.preventDefault();
                                       this.triggerDropdown();
                                       onItemClick(item.type)
                                   }}
                                >
                                    {item.label}
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

Dropdown.propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(
        {
            label: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired
        }
    )),
    onItemClick: PropTypes.func
};

export default Dropdown;
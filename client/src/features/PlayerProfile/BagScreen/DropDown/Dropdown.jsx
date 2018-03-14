import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
    state = {
        isActive: false
    };

    render() {
        const {label, items, onItemClick} = this.props;
        return (
            <div className="btn-group dropdown">
                <button type="button" className="btn btn-info" disabled={true}>
                    Раздел: "{label}"
                </button>
                <button className="btn btn-info btn-sm dropdown-toggle" type="button" id="dropdownBagScreen"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownBagScreen">
                    {items.map((item, index) => {
                        return (
                            <a href="#"
                               className="dropdown-item"
                               key={index}
                               onClick={e => {
                                   e.preventDefault();
                                   onItemClick(item.type)
                               }}
                            >
                                {item.label}
                            </a>
                        )
                    })}
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
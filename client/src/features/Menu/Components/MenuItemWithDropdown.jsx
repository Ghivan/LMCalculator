import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const MenuItemWithDropdown = ({title, items}) => {
    return (
        <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
                {title}
            </a>

            <div className="navbar-dropdown">
                {items.map(
                    (item, index) => {
                        return (
                            <Link className="navbar-item"
                                  to={item.path}
                                  key={index}
                            >
                                {item.title}
                            </Link>
                        )
                    }
                )
                }
            </div>
        </div>
    )
};

MenuItemWithDropdown.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape(
            {
                title: PropTypes.string.isRequired,
                path: PropTypes.string.isRequired
            }
        )
    )
};

export default MenuItemWithDropdown;
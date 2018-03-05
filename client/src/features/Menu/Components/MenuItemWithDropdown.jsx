import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const MenuItemWithDropdown = ({title, items, rootPath}) => {
    return (
        <div className="navbar-item has-dropdown is-hoverable">
            <NavLink className="navbar-link"
                     activeClassName="is-active"
                     to={rootPath}
            >
                {title}
            </NavLink>

            <div className="navbar-dropdown">
                {items.map(
                    (item, index) => {
                        return (
                            <NavLink className="navbar-item"
                                     activeClassName="is-active"
                                     to={item.path}
                                     key={index}
                            >
                                {item.title}
                            </NavLink>
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
    rootPath: PropTypes.string.isRequired,
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
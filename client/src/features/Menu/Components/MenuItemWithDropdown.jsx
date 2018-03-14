import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const MenuItemWithDropdown = ({title, items, rootPath}) => {
    return (
        <li className="nav-item dropdown">
            <NavLink className="nav-link dropdown-toggle"
               id={title}
               data-toggle="dropdown"
               aria-haspopup="true"
               aria-expanded="false"
               to={rootPath}
            >
                {title}
            </NavLink>
            <div className="dropdown-menu" aria-labelledby={title}>
                {items.map(
                    (item, index) => {
                        return (
                            <NavLink className="dropdown-item"
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
        </li>
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
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import MenuItemsList from "./MenuItemsList";
import MenuItem from './Components/MenuItem';
import MenuItemWithDropdown from "./Components/MenuItemWithDropdown";

class Menu extends React.Component {
    state = {
        is_active: false
    };

    render() {
        const {is_loggedIn = false} = this.props;
        const MenuItems = MenuItemsList.filter(item => item.is_loggedIn === is_loggedIn);

        return (
            <div className="navbar is-info" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <img src="/images/Icon.png"
                             alt="Lm Calculator"
                             height="56"/>
                    </Link>
                    <div className={`navbar-burger burger ${this.state.is_active ? 'is-active' : ''}`}
                         onClick={() => this.setState({is_active: !this.state.is_active})}
                    >
                        <span/>
                        <span/>
                        <span/>
                    </div>
                </div>
                <div className={`navbar-menu ${this.state.is_active ? 'is-active' : ''}`}>
                    <div className="navbar-start">
                        {
                            MenuItems.map(
                                (item, index) => {
                                    if (item.has_dropdown) {
                                        return <MenuItemWithDropdown title={item.title}
                                                                     items={item.items}
                                                                     key={index}

                                        />
                                    } else {
                                        return <MenuItem title={item.title}
                                                         path={item.path}
                                                         key={index}
                                        />
                                    }
                                }
                            )
                        }
                    </div>
                    <div className="navbar-end"/>
                </div>
            </div>
        )
    }
}

Menu.propTypes = {
    is_admin: PropTypes.bool,
    is_loggedIn: PropTypes.bool
};

export default Menu;


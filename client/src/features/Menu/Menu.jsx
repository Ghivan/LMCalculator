import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

import MenuItemsList from "./MenuItemsList";
import MenuItem from './Components/MenuItem';
import MenuItemWithDropdown from "./Components/MenuItemWithDropdown";

class Menu extends React.Component {
    state = {
        is_active: false
    };

    render() {
        const {is_loggedIn = false, logout} = this.props;
        const MenuItems = MenuItemsList.filter(item => item.is_loggedIn === is_loggedIn);

        return (
            <div className="row">
                <nav className="navbar navbar-expand-md w-100 navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        <img src="/img/Icon.png" width="60" height="60"
                             className="d-inline-block align-top m-1" alt="App icon"/>
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#main-navbar"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="main-navbar">
                        <ul className="navbar-nav mr-auto">
                            {
                                MenuItems.map(
                                    (item, index) => {
                                        if (item.has_dropdown) {
                                            return <MenuItemWithDropdown title={item.title}
                                                                         items={item.items}
                                                                         rootPath={item.rootPath}
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
                        </ul>
                        <span className="navbar-text">
                            <button className="nav-link btn btn-sm btn-danger"
                                    onClick={e => {
                                        e.preventDefault();
                                        logout();
                                    }}>
                                Выйти из профиля
                            </button>
                    </span>
                    </div>
                </nav>
            </div>
        )
    }
}

Menu.propTypes = {
    is_admin: PropTypes.bool,
    is_loggedIn: PropTypes.bool,
    logout: PropTypes.func
};

export default withRouter(Menu);


import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';


import TroopsCalculator from "../Calculator/TroopsCalculator";
import PlayerProfile from "../PlayerProfile/ConnectedPlayerProfile";
import GeneralCalculator from "../Calculator/GeneralCalculator";
import LoginForm from "../LoginForm/ConnectedLoginForm";
import Menu from "../Menu/Menu";

const renderAuthorizedRoutes = (player) => {
    const {stats} = player.details;
    return (
        <Switch>
            <Route exact path="/profile"
                   component={PlayerProfile}
            />
            <Route path="/calculator" render={({location}) => {
                switch (location.pathname) {
                    case '/calculator/general':
                        return <GeneralCalculator/>;
                    case '/calculator/training':
                        return <TroopsCalculator speedBonus={stats ? stats.training : null}/>;
                    default:
                        return <GeneralCalculator/>;
                }
            }}/>
            <Route path="/"
                   render={
                       () => <Redirect to={'/profile'}/>
                   }
            />
        </Switch>
    )
};

const renderUnauthorizedRoutes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginForm}/>
            <Route path="/" render={() => <Redirect to={'/login'}/>}/>
        </Switch>
    )
};

const AppRouter = (
    {
        is_loggedIn = false,
        player,
        logout
    }
) => {

    return (
        <Router>
            <div>
                {is_loggedIn ? <Menu is_loggedIn={is_loggedIn} logout={logout}/> : null}
                {is_loggedIn ? renderAuthorizedRoutes(player) : renderUnauthorizedRoutes()}
            </div>
        </Router>
    )
};

AppRouter.propTypes = {
    is_admin: PropTypes.bool,
    is_loggedIn: PropTypes.bool,
    logout: PropTypes.func
};

export default AppRouter;
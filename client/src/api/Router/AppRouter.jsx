import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import TroopsCalculator from "../../features/Calculator/TroopsCalculator";
import PlayerProfile from "../../features/PlayerProfile/ConnectedPlayerProfile";
import GeneralCalculator from "../../features/Calculator/GeneralCalculator";
import LoginForm from "../../features/LoginForm/ConnectedLoginForm";
import Menu from "../../features/Menu/Menu";

const renderAuthorizedRoutes = () => {
  return (
      <Switch>
          <Route exact path="/profile"
                 component={PlayerProfile}
          />
          <Route exact path="/calculator/general"
                 component={GeneralCalculator}
          />

          <Route exact path="/calculator/training"
                 component={TroopsCalculator}
          />
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
        is_admin = false
    }
) => {
    return (
        <Router>
            <div>
                <Menu is_loggedIn={is_loggedIn}/>
                {is_loggedIn ? renderAuthorizedRoutes() : renderUnauthorizedRoutes()}
            </div>
        </Router>
    )
};

AppRouter.propTypes = {
    is_admin: PropTypes.string,
    is_loggedIn: PropTypes.string
};

export default AppRouter;
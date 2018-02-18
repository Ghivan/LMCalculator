import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import LoginForm from './features/LoginForm/ConnectedLoginForm';
import PlayerProfile from './features/PlayerProfile/ConnectedPlayerProfile';



class App extends Component {
    render() {
        const {id, isAdmin} = this.props.player;
        if (!id) {
            return (
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/login" component={LoginForm}/>
                            <Route path="/" render={() => <Redirect to={'/login'}/>}/>
                        </Switch>
                    </div>
                </Router>
            )
        } else {
            return (
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/profile"
                                   component={PlayerProfile}
                            />
                            <Route path="/"
                                   render={
                                       () => <Redirect to={'/profile'}/>
                                   }
                            />
                        </Switch>
                    </div>
                </Router>
            );
        }
    }
}

export default App;

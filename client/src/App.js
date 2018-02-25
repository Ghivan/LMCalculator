import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import LoginForm from './features/LoginForm/ConnectedLoginForm';
import PlayerProfile from './features/PlayerProfile/ConnectedPlayerProfile';
import Calculator from './features/Calculator/Calculator';


class App extends Component {
    componentDidMount() {
        const {id} = this.props.player;
        if (id) {
            this.props.fetchDetails(id);
        }
    }

    componentWillReceiveProps({player}) {
        if (player.id !== '' && this.props.player.id !== player.id) {
            this.props.fetchDetails(player.id);
        }
    }

    render() {
        const {id, isAdmin} = this.props.player;
        if (!id) {
            return (
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/login" component={LoginForm}/>
                            <Route exact path="/calculator" render={
                                () => (
                                    <Calculator totalSeconds={300}
                                                helpNumber={25}
                                                speedBonus={344.7}
                                    />
                                )
                            }/>
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

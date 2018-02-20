import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import LoginForm from './features/LoginForm/ConnectedLoginForm';
import PlayerProfile from './features/PlayerProfile/ConnectedPlayerProfile';
import GeneralCalculator from './features/Calculator/GeneralCalculator/GeneralCalculator';



class App extends Component {
    componentDidMount(){
        const {id} = this.props.player;
        if (id){
            this.props.fetchDetails(id);
        }
    }

    componentWillReceiveProps({player}){
        if (player.id !== '' && this.props.player.id !== player.id){
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
                            <Route exact path="/calculator" component={GeneralCalculator}/>
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

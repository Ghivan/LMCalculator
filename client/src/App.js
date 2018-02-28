import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom';

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
        const {id} = this.props.player;
        if (!id) {
            return (
                <div>
                    <section className="hero is-primary">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">
                                    LM Calculator
                                </h1>
                                <h2 className="subtitle">
                                    помощник для игры Lords Mobile
                                </h2>
                            </div>
                        </div>
                    </section>
                    <Router>
                        <div>
                            <nav className="navbar is-info" role="navigation" aria-label="main navigation">
                                <div className="navbar-brand">
                                    <Link className="navbar-item" to="/">
                                        <img src="/images/Icon.png"
                                             alt="Lm Calculator"
                                             height="56"/>
                                    </Link>
                                    <div className="navbar-burger burger"
                                         data-target="MainMenu">
                                        <span/>
                                        <span/>
                                        <span/>
                                    </div>
                                </div>
                                <div className="navbar-menu"
                                     id="MainMenu">
                                    <div className="navbar-start">
                                        <Link className="navbar-item"
                                              to="/calculator"
                                        >
                                            Калькулятор
                                        </Link>
                                    </div>

                                    <div className="navbar-end">
                                        <Link className="navbar-item"
                                              to="/login"
                                        >
                                            Войти
                                        </Link>
                                    </div>
                                </div>
                            </nav>
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
                </div>
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

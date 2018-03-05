import React from 'react';
import AppRouter from "./features/Router/AppRouter";


class App extends React.Component {
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
                    <AppRouter is_loggedIn={id !== ''}/>
                </div>
            )
    }
}

export default App;

import React from 'react';

import AppRouter from "./features/Router/AppRouter";
import FloatError from "./features/Errors/FloatError/FloatError";
import Modal from "./features/Modal/Modal";


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
        const {error} = this.props;
            return (
                <div>
                    <Modal>
                        <FloatError message={error}/>
                    </Modal>
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
                    <AppRouter is_loggedIn={id !== ''} player={this.props.player}/>
                </div>
            )
    }
}

export default App;

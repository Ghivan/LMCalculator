import React from 'react';

import AppRouter from "./features/Router/AppRouter";
import FloatError from "./features/Errors/FloatError/FloatError";
import Modal from "./features/Modal/Modal";
import Loader from "./features/Loader/Loader";


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
            <div className="container">
                <Loader display={this.props.isLoading}/>
                {error ?
                    <Modal>
                        <FloatError message={error}/>
                    </Modal> :
                    null
                }
                <AppRouter is_loggedIn={id !== ''} player={this.props.player} logout={this.props.logout}/>
            </div>
        )
    }
}

export default App;

import React, {Component} from 'react';
import LoginForm from './features/LoginForm/LoginForm';

class App extends Component {
    clearError = () => {
        setTimeout(() => this.setState({globalError: ''}), 0)
    };

    constructor(props) {
        super(props);
        this.state = {
            globalError: ''
        };
    }

    render() {
        return (
            <div onClick={() => {
                this.setState({globalError: 'error'});
            }}>
                <LoginForm login={(params) => {
                    console.log(params)
                }}
                           globalError={this.state.globalError}
                           clearError={this.clearError}
                />
            </div>
        );
    }
}

export default App;

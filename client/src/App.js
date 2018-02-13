import React, {Component} from 'react';
import LoginForm from './features/LoginForm/LoginForm';
class App extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <LoginForm login={()=>{}}/>
        );
    }
}

export default App;

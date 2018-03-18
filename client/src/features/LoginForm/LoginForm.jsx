import React from 'react';
import PropTypes from 'prop-types';

import {InputNames} from './constants';
import validate from './utils/functions';

import InputField from './InputField/InputField';

class LoginForm extends React.Component {
    state = {
        [InputNames.NICKNAME]: '',
        [InputNames.PASSWORD]: '',
        errors: {
            [InputNames.NICKNAME]: '',
            [InputNames.PASSWORD]: ''
        }
    };

    handleInputChange = e => {
        return this.setState({[e.target.name]: e.target.value})
    };

    handleInputFocus = e => {
        const inputName = e.target.name;
        this.setState((prevState) => {
            return {
                ...prevState,
                errors: {
                    ...prevState.errors,
                    [inputName]: ''
                }
            }
        })
    };

    handleInputBlur = e => {
        const value = e.target.value.trim();
        const inputName = e.target.name;
        validate(inputName, value, (err) => {
            if (err) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        [inputName]: value.trim(),
                        errors: {
                            ...prevState.errors,
                            [inputName]: err.message
                        }
                    }
                })
            } else {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        [inputName]: value.trim(),
                        errors: {
                            ...prevState.errors,
                            [inputName]: ''
                        }
                    }
                })
            }
        });
    };

    render() {
        return (
            <form className="form-signin">
                <img src="img/Icon.png" className="mb-4" alt="Lords Mobile game icon"/>
                <h1>LM Calculator</h1>
                <div className="input-group">
                    <InputField name={InputNames.NICKNAME}
                                value={this.state[InputNames.NICKNAME]}
                                error={this.state.errors[InputNames.NICKNAME]}
                                label="Логин:"
                                icon="fa-user"
                                placeholder="Ваш логин..."
                                handleInputBlur={this.handleInputBlur}
                                handleInputChange={this.handleInputChange}
                                handleInputFocus={this.handleInputFocus}

                    />
                    <InputField name={InputNames.PASSWORD}
                                value={this.state[InputNames.PASSWORD]}
                                error={this.state.errors[InputNames.PASSWORD]}
                                label="Пароль:"
                                icon="fa-unlock"
                                placeholder="Ваш пароль..."
                                type="password"
                                handleInputBlur={this.handleInputBlur}
                                handleInputChange={this.handleInputChange}
                                handleInputFocus={this.handleInputFocus}
                    />
                </div>
                <button className="btn btn-lg btn-primary btn-block"
                        disabled={
                            this.state[InputNames.NICKNAME] === '' ||
                            this.state[InputNames.PASSWORD] === '' ||
                            this.state.errors[InputNames.NICKNAME] ||
                            this.state.errors[InputNames.PASSWORD]
                        }
                        onClick={e => {
                            e.preventDefault();
                            if (this.state[InputNames.NICKNAME] !== '' &&
                                this.state[InputNames.PASSWORD] !== '' &&
                                !this.state.errors[InputNames.NICKNAME] &&
                                !this.state.errors[InputNames.PASSWORD]) {
                                this.props.login({
                                    nickname: this.state[InputNames.NICKNAME],
                                    password: this.state[InputNames.PASSWORD]
                                })
                            }
                        }}
                >Войти
                </button>
            </form>
        )
    }
}

LoginForm.propTypes = {
    login: PropTypes.func,
    clearError: PropTypes.func
};

export default LoginForm;
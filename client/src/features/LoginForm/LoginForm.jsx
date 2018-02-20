import React from 'react';
import PropTypes from 'prop-types';

import './css/LoginForm.css';

import {InputNames} from './constants';
import validate from './utils/functions';

import FloatError from "../Errors/FloatError/FloatError";
import InputField from '../Global/InputField/InputField';

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
        const {error} = this.props;
        return (
            <div>
                {error ? <FloatError message={error}/> : null}
                <div className="login-form-container">
                    <form className="needs-validation">
                        <InputField name={InputNames.NICKNAME}
                                    value={this.state[InputNames.NICKNAME]}
                                    error={this.state.errors[InputNames.NICKNAME]}
                                    label="Логин:"
                                    placeholder="Ваш логин..."
                                    handleInputBlur={this.handleInputBlur}
                                    handleInputChange={this.handleInputChange}
                                    handleInputFocus={this.handleInputFocus}
                        />
                        <InputField name={InputNames.PASSWORD}
                                    value={this.state[InputNames.PASSWORD]}
                                    error={this.state.errors[InputNames.PASSWORD]}
                                    label="Пароль:"
                                    placeholder="Ваш пароль..."
                                    type="password"
                                    handleInputBlur={this.handleInputBlur}
                                    handleInputChange={this.handleInputChange}
                                    handleInputFocus={this.handleInputFocus}
                        />
                        <a href="#"
                           className={`button crisp ${(this.state[InputNames.PASSWORD] === '' || this.state[InputNames.NICKNAME] === '') ? 'disabled' : ''}`}
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
                        </a>
                    </form>
                </div>
            </div>
        )
    }
}

LoginForm.propTypes = {
    login: PropTypes.func,
    clearError: PropTypes.func
};

export default LoginForm;
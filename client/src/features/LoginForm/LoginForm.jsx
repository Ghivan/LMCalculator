import React from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField'
import {InputNames} from './constants'
import validate from './utils/functions'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            password: '',
            errors: {
                nickname: '',
                password: ''
            }
        }
    }


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
            <div className="row justify-content-center">
                <div className="col-6">
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
                    </form>
                </div>
            </div>
        )
    }
}

LoginForm.propTypes = {
    login: PropTypes.func
};

export default LoginForm;
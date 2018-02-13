import React from 'react';
import PropTypes from 'prop-types';

import Validator from './utils/Validator'
import InputField from './InputField'

const InputNames = {
    NICKNAME: 'nickname',
    PASSWORD: 'password'
};

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
        Validator.validateNickname(value, (err) => {
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
                                    error={this.state.errors[InputNames.NICKNAME]}
                                    handleInputBlur={this.handleInputBlur}
                                    handleInputChange={this.handleInputChange}
                                    handleInputFocus={this.handleInputFocus}
                        />
                        <InputField name={InputNames.PASSWORD}
                                    error={this.state.errors[InputNames.PASSWORD]}
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
import {InputNames, MinNicknameLength, MinPasswordLength} from '../constants';

const Validators = {
    [InputNames.NICKNAME]: nickname => {
        let message = nickname.length >= MinNicknameLength ? '' : `Длина логина должна быть меньше ${MinNicknameLength}`;
        if (nickname.length === 0) message = `Поле не должно быть пустым`;

        return message;
    },

    [InputNames.PASSWORD]: password => {
        let message = password.length >= MinPasswordLength ? '' : `Длина пароля должна быть меньше ${MinPasswordLength}`;
        if (password.length === 0) message = `Поле не должно быть пустым`;
        return message;
    }
};

const validate = (type, value, callback) => {
    const message = Validators[type](value);

    return message ? callback({message}) : callback(null)
};


export default validate;
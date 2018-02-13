const Validator = {
    validateNickname: (nickname, callback) => {
        const MinNicknameLength = 3;
        let message = nickname.length >= MinNicknameLength ? '' : `Длина логина должна быть больше ${MinNicknameLength}`;
        if (nickname.length === 0) message = `Поле не должно быть пустым`;

        return message ? callback({message}) : callback(null)
    }
};

export default Validator;
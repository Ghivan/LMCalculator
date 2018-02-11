const throwAuthError = () => {
    const error = new Error('Неправильный логин или пароль');
    error.name = 'Auth failed';
    throw error;
};

module.exports = {
    throwAuthError
};
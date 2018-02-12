import {makeRequestWithBody} from './utils/functions'

const AuthUrls = {
    LOGIN: '/auth/login'
};

const AuthAPI = {
    login: (credentials) => {
        return makeRequestWithBody(AuthUrls.LOGIN, 'POST', credentials)
    }
};

export default AuthAPI;
import {makeRequestWithBody} from './utils/functions'

const AuthUrls = {
    LOGIN: '/auth/login',
    VERIFY_TOKEN: '/auth/verify'
};

const AuthAPI = {
    login: credentials => {
        return makeRequestWithBody(AuthUrls.LOGIN, 'POST', credentials)
    },
    verify: token => {
        return makeRequestWithBody(AuthUrls.VERIFY_TOKEN, 'POST', {token})
    }
};

export default AuthAPI;
import {makeRequestWithBody} from './utils/functions'
import {AUTH_URLS} from "./constants/constants";

const AuthAPI = {
    login: credentials => {
        return makeRequestWithBody(AUTH_URLS.LOGIN, 'POST', credentials)
    },
    verify: token => {
        return makeRequestWithBody(AUTH_URLS.VERIFY_TOKEN, 'POST', {token})
    }
};

export default AuthAPI;
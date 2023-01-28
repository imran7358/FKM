import { SIGNEDIN, LOGGEDOUT } from '../actionTypes';

const defaultState = {
    userToken: '',
};

function userReducer(state = defaultState, { type, userToken = '' }) {
    switch (type) {
        case SIGNEDIN:
            return {
                ...state,
                userToken,
            };
        case LOGGEDOUT:
            return {
                ...defaultState,
            };
        default:
            return defaultState;
    }
}

export default userReducer;

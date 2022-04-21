import { userRoles } from '../constants/userRoles';

const intialState = {
    role: userRoles.GUEST,
    isAuthUser: false
}

const authReducer = (state = intialState, action) => {
    switch (action.type) {

        default: {
            return state;
        }
    }
}

export default authReducer;

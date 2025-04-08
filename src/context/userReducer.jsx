export const initialState = {
    loggedIn: false,
    isSigningUp: false,

    email: '',
    password: ''
};

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            //console.log("email = " + action.payload?.email);
            //console.log("password = " + action.payload?.password);
            console.log("returnData = " + action.payload?.userData);
            return { ...state,
                isSigningUp: false
             }

        case 'LOGIN':
            //console.log("email = " + action.payload?.email);
            //console.log("password = " + action.payload?.password);
            //console.log("returnData = " + action.payload?.userData);
            return { ...state,
                loggedIn: true
             }

        case 'TOGGLE_SIGN_UP':
            return { ...state,
                isSigningUp: !state.isSigningUp
             }

        case 'TOGGLE_SIGNED_IN':
            return { ...state,
                loggedIn: !state.loggedIn
             }

        default:
            return state;
    }
}
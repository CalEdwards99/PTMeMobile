export const initialState = {
    loggedIn: false,
    isSigningUp: false,
    loading: false,
    error: '',
    message: '',

    email: '',
    password: ''
};

export const userReducer = (state, action) => {
    switch (action.type) {
        
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                error:'',
                loading:false,
                message:'Sign-up successful'                        
            };

        case 'REGISTER_FAILURE':
            return {
                ...state,
                isSigningUp: true,
                error: action.payload,
                loading:false,
                message:''
            };

        case 'LOGIN_SUCCESS':
            console.log("returnData = " + action.payload?.userData);
            return {
                ...state,
                loggedIn: true,
                loading: false,
                error: '',
                message: ''
            };

        case 'LOGIN_FAILURE':
            return {
                ...state,
                loggedIn: false,
                loading: false,
                message:'',
                error: 'Failed to login'
            };

        case 'LOADING':
            return {
                ...state,
                loading: true
            };

        case 'TOGGLE_SIGN_UP':
            return {
                ...state,
                isSigningUp: !state.isSigningUp,
                error: '',
                message: ''
            };

        case 'TOGGLE_SIGNED_IN':
            return {
                ...state,
                loggedIn: !state.loggedIn,
                error: '',
                message: ''
            };

        default:
            return state;
    }
}
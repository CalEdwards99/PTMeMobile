export const initialState = {
    loading: false,

    workoutName: '',
    workoutDescription: '',

    workoutsList: []
};

export const workoutReducer = (state, action) => {
    switch (action.type) {

        case 'GETWORKOUTS_SUCCESS':
            return {
                ...state,
                loading: false,
                workoutsList: action.payload
            };

        case 'DELETEWORKOUT_SUCCESS':
            return {
                ...state,
                loading: false,
                workoutsList: action.payload
            };

        case 'LOADING':
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}
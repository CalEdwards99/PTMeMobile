export const initialState = {
    exerciseList:[],
    currentExercise: '',
    selectedExerciseId: null,
    isExerciseModalVisible: false,
};

export const trainReducer = (state, action) => {
    switch(action.type ) {
        case 'SET_CURRENT_EXERCISE':
            return {...state, currentExercise: action.payload};

        case 'SAVE_EXERCISE':
            return {
                ...state,
                exerciseList: state.selectedExerciseId !== null ?
                state.exerciseList.map((exercise, index) =>
                index === state.selectedExerciseId ? state.currentExercise : exercise
            )
            : [...state.exerciseList, state.currentExercise],
            isExerciseModalVisible: false,
            selectedExerciseId: null,
            currentExercise: '',  
        };

        case 'REMOVE_EXERCISE':
            return {
                ...state,
                exerciseList: state.exerciseList.filter((_, index) => index !== state.selectedExerciseId),
                isExerciseModalVisible: false,
                selectedExerciseId: null,
                currentExercise: '',
            };
        
        case 'TOGGLE_MODAL':
            return {
                ...state,
                isExerciseModalVisible: !state.isExerciseModalVisible,
                currentExercise: action.payload?.exercise || '',
                selectedExerciseId: action.payload?.exerciseId !== undefined ? action.payload.exerciseId : null,
            };

        default:
            return state;
    }
}
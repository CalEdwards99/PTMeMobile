export const initialState = {
    currentExercise: '',
    selectedExerciseId: null,
    isExerciseModalVisible: false,

    isSetModalVisible: false,
    selectedSetId: '',
    selectedSetName:'',
    selectedSetReps: '',
    selectedSetWeight: '',


    //-New layout below-//
    sessionName: 'Push Day 1',
    exercises: [
    ]
};

export const trainReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_EXERCISE':
            return { ...state, currentExercise: action.payload };

        // new reducer for managing state's complex object
        case 'SAVE_EXERCISE':
            return {
                ...state,
                exercises: state.selectedExerciseId !== null ?
                    state.exercises.map((exercise) =>
                        exercise.exerciseId === action.payload.exerciseId ?
                            { ...exercise, exerciseName: action.payload.exerciseName } : exercise
                    )
                    : ([...state.exercises, { exerciseId: Date.now(), exerciseName: action.payload.exerciseName, sets: [] }])
            }

        case "REMOVE_EXERCISE":
            return {
                ...state,
                exercises: state.exercises.filter(ex => ex.exerciseId !== action.payload.exerciseId),
            }

            case "SAVE_SET":
                return {
                    ...state,
                    exercises: state.exercises.map(ex =>
                        ex.exerciseId === action.payload.exerciseId
                            ? {
                                ...ex,
                                sets: ex.sets.some(set => set.setId === action.payload.setId)
                                    ? ex.sets.map(set =>
                                        set.setId === action.payload.setId
                                            ? { ...set, weight: action.payload.weight, reps: action.payload.reps } // Edit existing set
                                            : set
                                    )
                                    : [
                                        ...ex.sets,
                                        {
                                            setId: ex.sets.length + 1, // New set ID
                                            weight: action.payload.weight,
                                            reps: action.payload.reps
                                        }
                                    ]
                            }
                            : ex
                    )
                };

        case "REMOVE_SET":
            return {
                ...state,
                exercises: state.exercises.map(ex =>
                    ex.exerciseId === action.payload.exerciseId
                        ? {
                            ...ex,
                            sets: ex.sets.filter(set => set.setId !== action.payload.setId)
                        }
                        : ex)
            }

        case 'TOGGLE_MODAL':
            return {
                ...state,
                isExerciseModalVisible: !state.isExerciseModalVisible,
                currentExercise: action.payload?.exerciseName || '',
                selectedExerciseId: action.payload?.exerciseId !== undefined ? action.payload.exerciseId : null,
            };

        case 'TOGGLESET_MODAL':
            return {
                ...state,
                isSetModalVisible: !state.isSetModalVisible,
                selectedExerciseId: action.payload?.exerciseId !== undefined ? action.payload.exerciseId : null,
                selectedSetId: action.payload?.setId !== undefined ? action.payload.setId : null,
                selectedSetName: action.payload?.setNo !== undefined ? action.payload.SetNo : null,
                selectedSetReps: action.payload?.reps || '',
                selectedSetWeight: action.payload?.weight || '',
            };

        default:
            return state;
    }
}
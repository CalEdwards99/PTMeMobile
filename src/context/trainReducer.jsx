export const initialState = {
    currentExercise: '',
    selectedExerciseId: null,
    isExerciseModalVisible: false,

    //-New layout below-//
    sessionName: 'Push Day 1',
    exercises: [
        {
            exerciseId: 1,
            exerciseName: 'Barbell BenchPress',
            sets: [
                { setId: 1, weight: 100, reps: 8 },
                { setId: 2, weight: 80, reps: 6 }
            ]
        }
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
                    {...exercise, exerciseName: action.payload.exerciseName} : exercise
                )
                : ([...state.exercises, {exerciseId: Date.now(), exerciseName: action.payload.exerciseName ,sets:[] }])
            }

        case "REMOVE_EXERCISE":
            return {
                ...state,
                exercises: state.exercises.filter(ex => ex.exerciseId !== action.payload.exerciseId),
            }

        case "ADD_SET":
        return{
            ...state,
            exercises: state.exercises.map(ex => 
                ex.exerciseId === action.payload.exerciseId ? {
                    ...ex,
                    sets:[
                        ...ex.sets,
                        {
                            setId: Date.now(),
                            weight: action.payload.weight,
                            reps: action.payload.reps

                        }
                    ]
                }
                : ex
            )
        }

        case "REMOVE_SET":
            return{
                ...state,
                exercises: state.exercises.map(ex =>
                    ex.exerciseId === action.payload.exerciseId
                ? {
                    ...ex,
                    sets: ex.sets.filter(set => set.setId !== action.payload.setId)
                }
            : ex)
            }

        case "EDIT_SET":
            return{
                ...state,
                exercises: state.exercises.map(ex =>
                    ex.exerciseId === action.payload.exerciseId
                    ? {
                        ...ex,
                        sets: ex.sets.map(set => 
                            set.setId === action.payload.setId 
                            ? {...set, weight: action.payload.weight, reps: action.payload.reps}
                            : set
                        )
                    }
                : ex
                )
            }

        case 'TOGGLE_MODAL':
            return {
                ...state,
                isExerciseModalVisible: !state.isExerciseModalVisible,
                currentExercise: action.payload?.exerciseName || '',
                selectedExerciseId: action.payload?.exerciseId !== undefined ? action.payload.exerciseId : null,
            };

        default:
            return state;
    }
}
export const initialState = {

    currentExercise: '',
    selectedExerciseId: null,
    selectedUniqueId: null,

    isExerciseModalVisible: false,
    finishWorkout: false,

    isSetModalVisible: false,
    selectedSetId: '',
    selectedSetName: '',
    selectedSetReps: '',
    selectedSetWeight: '',

    isDeleteSetModalVisible: false,

    workoutId: null,
    workoutRatingId: 0,
    workoutSessionName: '',
    sessionNotes: '',

    listAllExercises: [],

    //-New layout below-//
    //sessionName: null,
    sessionDescription: null,

    exercises: [],

    savedWorkout: null,

    workoutSummary: false

};

export const trainReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_EXERCISE':
            return { ...state, currentExercise: action.payload };

        case 'GETEXERCISES_SUCCESS':
            console.log("got all exercises");
            console.log("payload: " + action.payload);

            const updatedExercises = action.payload.map(({ id, exerciseName, muscleGroup }) => ({
                id,
                title: exerciseName,
                muscleGroup
            }));

            return { ...state, listAllExercises: updatedExercises }

        // new reducer for managing state's complex object
        case 'SAVE_EXERCISE':
            return {
                ...state,
                exercises: state.selectedExerciseId !== null ?
                    state.exercises.map((exercise) =>
                        exercise.uniqueId === action.payload.uniqueId ?
                            { ...exercise, exerciseId: action.payload.exerciseId, exerciseName: action.payload.exerciseName } : exercise
                    )
                    : (
                        [...state.exercises, { uniqueId: Date.now(), exerciseId: action.payload.exerciseId, exerciseName: action.payload.exerciseName, sets: [] }]),
                selectedExerciseId: null,
                selectedUniqueId: null
            }

        case "REMOVE_EXERCISE":
            return {
                ...state,
                exercises: state.exercises.filter(ex => ex.uniqueId !== action.payload.uniqueId),
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
            console.log("uniqueId: " + action.payload?.uniqueId)
            console.log("exerciseId: " + action.payload?.exerciseId)
            return {
                ...state,
                isExerciseModalVisible: !state.isExerciseModalVisible,
                currentExercise: action.payload?.exerciseName || '',
                selectedExerciseId: action.payload?.exerciseId !== undefined ? action.payload.exerciseId : null,
                selectedUniqueId: action.payload?.uniqueId !== undefined ? action.payload.uniqueId : null,
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

        case 'TOGGLEDELETESET_MODAL':
            return {
                ...state,
                isDeleteSetModalVisible: !state.isDeleteSetModalVisible,
                selectedExerciseId: action.payload?.exerciseId !== undefined ? action.payload.exerciseId : null,
                selectedSetId: action.payload?.setId !== undefined ? action.payload.setId : null,
                selectedSetName: action.payload?.setNo !== undefined ? action.payload.setNo : null,
            };

        case 'TOGGLE_FINISH_WORKOUT':
            return {
                ...state,
                finishWorkout: !state.finishWorkout
            };

        case 'RATE_WORKOUT':
            return {
                ...state,
                workoutRatingId: action.payload
            }

        case 'SESSION_NOTES':
            return {
                ...state,
                sessionNotes: action.payload
            }

        case 'SESSION_NAME':
            return {
                ...state,
                workoutSessionName: action.payload
            }

        case 'ADD_SET':
            return {
                ...state,
                exercises: state.exercises.map(ex =>
                    ex.uniqueId === action.payload.uniqueId
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
                                        weight: null,
                                        reps: null
                                    }
                                ]
                        }
                        : ex
                )
            }

        case 'SAVE_WORKOUT_SUCCESS':
            return {
                ...state,
                savedWorkout: true,
                // any other state you want to reset
            };

        case "VIEW_WORKOUT_SUMMARY":
            return {
                ...state,
                workoutSummary: !state.workoutSummary
            }

        case "FINISH_WORKOUT_SUMMARY":
            return {
                ...state,
                workoutSummary: !state.workoutSummary,
                workoutId: null,
                workoutRatingId: 0,
                workoutSessionName: state.workoutSessionName,
                sessionNotes: '',
                //sessionName: null,
                sessionDescription: null,
                exercises: [],
            }

        default:
            return state;
    }
}
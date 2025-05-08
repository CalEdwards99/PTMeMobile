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


    //-New layout below-//
    sessionName: 'Push Day 1',

    exercises:[],

    // exercises: [{
    //     exerciseId: 1,
    //     exerciseName: 'BB Benchpress',
    //     muscle: ['Chest', 'Triceps'],
    //     sets: [
    //         { setId: 1, weight: 80, reps: 8 },
    //         { setId: 2, weight: 90, reps: 6 },
    //         { setId: 3, weight: 100, reps: 5 },
    //         { setId: 4, weight: 100, reps: 4 }
    //     ]
    // },
    // {
    //     exerciseId: 2,
    //     exerciseName: 'Tricep Pushdown',
    //     muscle: ['Tricep'],
    //     sets: [
    //         { setId: 1, weight: 18, reps: 12 },
    //         { setId: 2, weight: 28, reps: 8 },
    //         { setId: 3, weight: 28, reps: 8 }
    //     ]
    // },
    // {
    //     exerciseId: 3,
    //     exerciseName: 'DB Shouldpress',
    //     muscle:['Shoulders', 'Tricep'],
    //     sets: [
    //         { setId: 1, weight: 36, reps: 14 },
    //         { setId: 2, weight: 60, reps: 8 },
    //         { setId: 3, weight: 64, reps: 8 }
    //     ]
    // },
    // {
    //     exerciseId: 4,
    //     exerciseName: 'Cable Lat-raise',
    //     muscle:["Shoulders"],
    //     sets: [
    //         { setId: 1, weight: 11, reps: 14 },
    //         { setId: 2, weight: 11, reps: 14 }
    //     ]
    // }]
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
                        exercise.uniqueId === action.payload.uniqueId ?
                            { ...exercise, exerciseId: action.payload.exerciseId , exerciseName: action.payload.exerciseName } : exercise
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

        case 'TOGGLE_FINISH_WORKOUT':
            return {
                ...state,
                finishWorkout: !state.finishWorkout
            };

        default:
            return state;
    }
}
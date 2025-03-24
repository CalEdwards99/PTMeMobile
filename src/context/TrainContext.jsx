import react, { createContext, useContext, useReducer } from 'react';
import { trainReducer, initialState } from './trainReducer.jsx';

const TrainContext = createContext();

export const TrainProvider = ({ children }) => {
    const [state, dispatch] = useReducer(trainReducer, initialState);

    return (

        <TrainContext.Provider
            value={{
                exerciseList: state.exerciseList,
                currentExercise: state.currentExercise,
                selectedExerciseId: state.selectedExerciseId,
                isExerciseModalVisible: state.isExerciseModalVisible,

                setCurrentExercise: (exercise) => dispatch({type: 'SET_CURRENT_EXERCISE', payload: exercise}),
                saveExercise : () => dispatch({type:"SAVE_EXERCISE"}),
                removeExercise: () => dispatch({type:'REMOVE_EXERCISE'}),
                toggleExerciseModal: (exercise = null, exerciseId = null) =>
                    dispatch({type: "TOGGLE_MODAL", payload: {exercise, exerciseId}}),
            }}
        >
            {children}
        </TrainContext.Provider>
    );
};

export const useTrainContext = () => {
    return useContext(TrainContext);
}
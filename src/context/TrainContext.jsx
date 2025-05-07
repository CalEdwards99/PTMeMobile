import React, { createContext, useContext, useReducer } from 'react';
import { trainReducer, initialState } from './trainReducer.jsx';

const TrainContext = createContext();

export const TrainProvider = ({ children }) => {
    const [state, dispatch] = useReducer(trainReducer, initialState);

    const getTrainWorkout = async (workoutId) => {
        console.log("get train workout");
                // dispatch({ type: 'LOADING' });
                // try {
                //     const workouts = await getWorkouts();
                //     dispatch({type: 'GETWORKOUTS_SUCCESS', payload: workouts})
                // } catch (err) {
                //     console.log(err);
                //     //dispatch({type: 'GETWORKOUTS_FAILURE', payload: workouts})
                // }
            };

    return (
        <TrainContext.Provider value={{ state, dispatch, getTrainWorkout}} >
            {children}
        </TrainContext.Provider>
    );
};

export const useTrainContext = () => {
    return useContext(TrainContext);
}
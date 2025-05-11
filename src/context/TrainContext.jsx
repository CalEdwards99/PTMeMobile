import React, { createContext, useContext, useReducer } from 'react';
import { trainReducer, initialState } from './trainReducer.jsx';
import { getExercises } from '../API/exercise.js';
import { getTrainWorkout } from '../API/train.js';

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

    const getExerciseList = async () => {
        console.log("getting list of exercises")

        try {
            const exercises = await getExercises();
            dispatch({ type: 'GETEXERCISES_SUCCESS', payload: exercises })
        } catch (err) {
            console.log(err);
            //dispatch({type: 'GETWORKOUTS_FAILURE', payload: workouts})
        }

    }

    return (
        <TrainContext.Provider value={{ state, dispatch, getTrainWorkout, getExerciseList }} >
            {children}
        </TrainContext.Provider>
    );
};

export const useTrainContext = () => {
    return useContext(TrainContext);
}
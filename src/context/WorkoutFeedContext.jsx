import React, { createContext, useContext, useReducer } from 'react';
import { workoutFeedReducer, initialState } from './workoutFeedReducer.jsx';
import { getWorkoutsSessionFeed } from '../API/workoutsession.js';

const WorkoutFeedContext = createContext();

export const WorkoutFeedProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutFeedReducer, initialState);

    const getWorkoutFeed = async () => {
                dispatch({ type: 'LOADING' });
                try {
                    const workouts = await getWorkoutsSessionFeed();

                    console.log("workouts");

                    console.log(workouts);

                    dispatch({type: 'GETWORKOUTS_SUCCESS', payload: workouts})
                } catch (err) {
                    console.log("Get Workout Feed error");
                    console.log(err);
                    //dispatch({type: 'GETWORKOUTS_FAILURE', payload: workouts})
                }
            };


    return (
        <WorkoutFeedContext.Provider value={{ state, dispatch, getWorkoutFeed }} >
            {children}
        </WorkoutFeedContext.Provider>
    );
};

export const useWorkoutFeedContext = () => {
    return useContext(WorkoutFeedContext);
}
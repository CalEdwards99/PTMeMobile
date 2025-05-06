import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { workoutReducer, initialState } from './workoutReducer.jsx';
import { getWorkouts, saveWorkout, deleteWorkout } from '../API/workout.js';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, initialState);

    const getUserWorkouts = async () => {
            dispatch({ type: 'LOADING' });
            try {
                const workouts = await getWorkouts();
                dispatch({type: 'GETWORKOUTS_SUCCESS', payload: workouts})
            } catch (err) {
                console.log(err);
                //dispatch({type: 'GETWORKOUTS_FAILURE', payload: workouts})
            }
        };

        const saveUserWorkout = async (name, description) => {
            dispatch({ type: 'LOADING' });
            try {
                const workoutResponse = await saveWorkout(name, description);
                
                console.log(workoutResponse)

                if (workoutResponse) {
                    // Optionally: add just the new one to state instead of refetching all
                    // dispatch({ type: 'ADD_WORKOUT', payload: workoutResponse });
        
                    // Better for now: refresh whole list
                    const workouts = await getWorkouts();
                    dispatch({type: 'GETWORKOUTS_SUCCESS', payload: workouts})
                    //dispatch({ type: 'SAVEWORKOUT_SUCCESS' });
                } else {
                    dispatch({ type: 'SAVEWORKOUT_FAILURE', payload: 'Save failed' });
                }
            } catch (err) {
                dispatch({ type: 'SAVEWORKOUT_FAILURE', payload: err.message });
                console.error(err);
            }
        };

        const deleteUserWorkout = async (workoutId) => {
            dispatch({ type: 'LOADING' });
            try {
                const response = await deleteWorkout(workoutId);

                if (response) {
                    const workouts = await getWorkouts();
                    dispatch({type: 'GETWORKOUTS_SUCCESS', payload: workouts})
                } else {
                    dispatch({ type: 'SAVEWORKOUT_FAILURE', payload: 'Save failed' });
                }
            } catch (err) {
                console.log(err);
            }
        };

    return (
        <WorkoutContext.Provider value={{ state, dispatch, getUserWorkouts, saveUserWorkout, deleteUserWorkout }} >
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkoutContext = () => {
    return useContext(WorkoutContext);
}
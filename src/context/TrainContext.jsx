import React, { createContext, useContext, useReducer } from 'react';
import { trainReducer, initialState } from './trainReducer.jsx';
import { getExercises } from '../API/exercise.js';
import { getTrainWorkout } from '../API/train.js';
import { addWorkoutSession } from '../API/workoutsession.js';

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

    const saveWorkoutSession = async () => {
        try {

            workoutSessionSave = {
                //workoutId: state.workoutId,
                workoutId: state.workoutId,
                sessionRatingId: state.workoutRatingId,
                workoutSessionName: state.workoutSessionName,
                sessionNotes: state.sessionNotes,
                sessionExercises: state.exercises.map((exercise, index) => ({
                  exerciseId: parseInt(exercise.exerciseId),
                  sets: exercise.sets.map((set, i) => ({
                    setNo: i + 1,
                    weight: parseFloat(set.weight),
                    reps: parseInt(set.reps),
                  })),
                })),
              };

            console.log("Workout saving, lets see then");
            console.log(JSON.stringify(workoutSessionSave, null, 2));

            await addWorkoutSession(workoutSessionSave);
            
            //dispatch({ type: 'SAVEWORKOUT_SUCCESS', payload: exercises })
            dispatch({ type: "VIEW_WORKOUT_SUMMARY" })
        } catch (err) {
            console.log(err);
            dispatch({type: 'SAVEWORKOUT_FAILURE', payload: workouts})
        }

    }

    return (
        <TrainContext.Provider value={{ state, dispatch, getTrainWorkout, getExerciseList, saveWorkoutSession }} >
            {children}
        </TrainContext.Provider>
    );
};

export const useTrainContext = () => {
    return useContext(TrainContext);
}
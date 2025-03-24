import react, { createContext, useContext, useState } from 'react';

const TrainContext = createContext();

export const TrainProvider = ({ children }) => {
    const [exerciseList, setExerciseList] = useState([]);
    const [currentExercise, setCurrentExercise] = useState('');
    const [isExerciseModalVisible, setIsExerciseModalVisible] = useState(false);

    
    // Add new exercise to the list
    const addExercise = () => {
        console.log("got here");
        console.log(currentExercise);

        setExerciseList((prevList) => [...prevList, currentExercise]);

        setIsExerciseModalVisible(false);
    };

    // Toggle modal visibility and pass the exercise to be edited
    const toggleExerciseModal = (exercise = null) => {
        setCurrentExercise(exercise);
        setIsExerciseModalVisible((prev) => !prev);
    };

    return (

        <TrainContext.Provider
            value={{
                exerciseList,
                setCurrentExercise,
                addExercise,
                currentExercise,
                isExerciseModalVisible,
                toggleExerciseModal,
            }}
        >
            {children}
        </TrainContext.Provider>
    );
};

export const useTrainContext = () => {
    return useContext(TrainContext);
}
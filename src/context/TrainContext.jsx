import react, { createContext, useContext, useState } from 'react';

const TrainContext = createContext();

export const TrainProvider = ({ children }) => {
    const [exerciseList, setExerciseList] = useState([]);
    const [currentExercise, setCurrentExercise] = useState('');
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);
    const [isExerciseModalVisible, setIsExerciseModalVisible] = useState(false);

    
    // Add new exercise to the list
    const addExercise = () => {

        setExerciseList((prevList) => {
                if (selectedExerciseId !== null) {
                  // Editing an existing item
                  const updatedList = [...prevList];
                  updatedList[selectedExerciseId] = currentExercise;
                  return updatedList;
                } else {
                  // Adding a new item
                  return [...prevList, currentExercise];
                }
            })

        setIsExerciseModalVisible(false);
    };

    const removeExercise = () =>{

        setExerciseList((prevList) => {
            if (selectedExerciseId !== null) {
                // removing exercise from list
                const updatedList = [...prevList];
                updatedList.splice(selectedExerciseId, 1)
                return updatedList;

            }
        })

        setIsExerciseModalVisible(false);
    }

    // Toggle modal visibility and pass the exercise to be edited
    const toggleExerciseModal = (exercise = null, exerciseId = null) => {
        setCurrentExercise(exercise);
        setSelectedExerciseId(exerciseId);
        setIsExerciseModalVisible((prev) => !prev);
    };

    return (

        <TrainContext.Provider
            value={{
                exerciseList,
                setCurrentExercise,
                addExercise,
                removeExercise,
                currentExercise,
                selectedExerciseId,
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
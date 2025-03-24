import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTrainContext } from '../../context/TrainContext.jsx';

import ListSet from '../train/Set.jsx';
import styles from '../../styles/style.jsx';
import Modal from '../modals/Set.jsx';

const Exercise = ({ exerciseName }) => {

    const {toggleExerciseModal} = useTrainContext();

    const [exercise, setExercise] = useState(exerciseName);
    const [chevron, setChevron] = useState("chevron-down");
    const [rowOpen, setRowOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const [weight, setWeight] = useState('');  // Example weight value
    const [reps, setReps] = useState('');  // Example reps value
    const [setName, setSetName] = useState('');  // Example Set Name (Optional)
    const [isModalVisible, setModalVisible] = useState(false);
    const [listOfSets, setListOfSets] = useState([]);

    // Fixing the OpenRowHandler function
    const OpenRowHandler = () => {
        if (rowOpen) {
            setChevron('chevron-down');
            setRowOpen(false);
            setCollapsed(true);
        } else {
            setChevron('chevron-up');
            setRowOpen(true);
            setCollapsed(false);
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const addSet = () => {
        setWeight('');
        setReps('');
        setSetName('');
        setModalVisible(true);
    };

    const handleAddSet = (newWeight, newReps) => {
        console.log('Updated weight:', newWeight, 'Updated reps:', newReps);

        // Fixing the state update here: no need for the object {newSet}
        const newSet = { id: String(listOfSets.length + 1), weight: newWeight, reps: newReps };

        // Add the new set to the listOfSets array
        setListOfSets(prevList => [...prevList, newSet]);
    };

     const handleEditExercise = () => {
         toggleExerciseModal(exerciseName); // Send the current exercise name for editing
    };

    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell> <TouchableOpacity onPress={handleEditExercise}><Text style={styles.linkUnderlineTitle}>{exerciseName}</Text></TouchableOpacity></DataTable.Cell>
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={OpenRowHandler}>
                            <View style={styles.icon_button}>
                                <Icon name={chevron} size={15} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>

            <Collapsible collapsed={collapsed} duration={475}>
                {listOfSets.map((item, index) => {
                    console.log(item);
                    return <ListSet key={index} setNo={item.id} weight={item.weight} reps={item.reps} />
})}

                <View>
                    <TouchableOpacity style={styles.addSet_button} onPress={addSet}>
                        <Text style={styles.buttonText}>
                            Add Set  <Icon name="plus-square" size={15} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </Collapsible>

            <Modal
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                weight={weight}  // Pass weight as a prop
                reps={reps}  // Pass reps as a prop
                setName={setName}  // Pass setName as a prop
                onSave={handleAddSet}  // Pass the handleAddSet function as the onSave prop
            />
        </>
    );
};

export default Exercise;

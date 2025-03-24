import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { DataTable } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style.jsx';

import { useTrainContext } from '../context/TrainContext.jsx';

import Exercise from '../components/train/Exercise.jsx';

import Modal from '../components/modals/Set.jsx';
import ExerciseModal from '../components/modals/ExerciseModal.jsx';

export default function Train() {

    const { exerciseList, addExercise, isExerciseModalVisible, toggleExerciseModal } = useTrainContext();

    const [chevron, setChevron] = useState("chevron-down");
    const [rowOpen, setRowOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    const [exercise, setExercise] = useState('');

    const [weight, setWeight] = useState('');  // Example weight value
    const [reps, setReps] = useState('');  // Example reps value
    const [setName, setSetName] = useState('');  // Example Set Name (Optional)

    const [isModalVisible, setModalVisible] = useState(false);

    const editSetRow = () => {
        setWeight('100');
        setReps('8');
        setSetName('Set 1');
        setModalVisible(true);
    }

    const handleSave = (newWeight, newReps) => {
        setWeight(newWeight); // Update weight
        setReps(newReps); // Update reps
        console.log('Updated weight:', newWeight, 'Updated reps:', newReps);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    function OpenRowHandler() {
        {
            rowOpen ? (
                setChevron('chevron-up'),
                setRowOpen(false),
                setCollapsed(false)
            ) : (
                setChevron('chevron-down'),
                setRowOpen(true),
                setCollapsed(true)
            )
        }
    }

    return (
        <>
            <Text style={[styles.textCenter, { fontSize: 18, marginTop: 7 }]}>Push Day 1</Text>
            <DataTable>
                <DataTable.Header>
                    <TouchableOpacity onPress={toggleExerciseModal}><DataTable.Title>Exercise  <Icon name="plus-square" size={15} color={"green"} /></DataTable.Title></TouchableOpacity>
                    <DataTable.Title numeric>Weight (KG)</DataTable.Title>
                    <DataTable.Title numeric>Reps</DataTable.Title>
                </DataTable.Header>
            </DataTable>

            {exerciseList.map((item, index) => (
                <Exercise key={"ExerciseNo-" + index} exerciseId={index} exerciseName={item} />
            ))}

            {/* <DataTable>
                <DataTable.Header>
                    <DataTable.Cell>Tricep Pushdown</DataTable.Cell>
                    <DataTable.Title numeric><Icon name="chevron-down" size={15} color={"black"} /></DataTable.Title>
                </DataTable.Header>

                <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={page => {
                        console.log(page);
                    }}
                    label="1-2 of 6"
                />
            </DataTable> */}

            <View style={{ flex: 1 }}>
                <ScrollView></ScrollView>
                <TouchableOpacity style={styles.finish_button} >
                    <Text style={styles.buttonText}><Icon name="flag-checkered" size={15} />  Finish Session  <Icon name="flag-checkered" size={15} /></Text>
                </TouchableOpacity>
            </View>

            <Modal isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                weight={weight}  // Pass weight as a prop
                reps={reps}  // Pass reps as a prop
                setName={setName}  // Pass setName as a prop 
                onSave={handleSave}
            />

            <ExerciseModal/>


        </>
    )
};
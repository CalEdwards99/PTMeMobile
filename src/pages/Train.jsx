import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { DataTable } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style.jsx';

import Exercise from '../components/train/Exercise.jsx';

import Modal from '../components/modals/Set.jsx';
import ExerciseModal from '../components/modals/Exercise.jsx';

export default function Train() {
    const [chevron, setChevron] = useState("chevron-down")
    const [rowOpen, setRowOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    const [exercise, SetExercise] = useState('');
    const [weight, setWeight] = useState('');  // Example weight value
    const [reps, setReps] = useState('');  // Example reps value
    const [setName, setSetName] = useState('');  // Example Set Name (Optional)

    const [isModalVisible, setModalVisible] = useState(false);
    const [isExerciseModalVisible, setExerciseModalVisible] = useState(false);

    const [exerciseList, setExerciseList] = useState([]);

    const editSetRow = () => {
        setWeight('100');
        setReps('8');
        setSetName('Set 1');
        setModalVisible(true);
    }

    const addSet = () => {
        setWeight('');
        setReps('');
        setSetName('');
        setModalVisible(true);

    }

     const handleSave = (newWeight, newReps) => {
         setWeight(newWeight); // Update weight
         setReps(newReps); // Update reps
         console.log('Updated weight:', newWeight, 'Updated reps:', newReps);
     };

    const handleAddExercise = (newExercise) => {
        setExerciseList(prevList => [...prevList, newExercise]);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleExerciseModal = () => {
        setExerciseModalVisible(!isExerciseModalVisible);
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

            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell>Barbell Benchpress</DataTable.Cell>
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={OpenRowHandler}>
                            <View style={styles.icon_button}>
                                <Icon name={chevron} size={15} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>

                <Collapsible collapsed={collapsed} duration={475} >
                    <DataTable.Row>
                        <TouchableOpacity onPress={editSetRow}><DataTable.Cell>Set 1</DataTable.Cell></TouchableOpacity>
                        <DataTable.Cell numeric>{weight}</DataTable.Cell>
                        <DataTable.Cell numeric>{reps}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Set 2</DataTable.Cell>
                        <DataTable.Cell numeric>35</DataTable.Cell>
                        <DataTable.Cell numeric>8</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Set 3</DataTable.Cell>
                        <DataTable.Cell numeric>100</DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Set 4</DataTable.Cell>
                        <DataTable.Cell numeric>100</DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>

                    <View>
                        <TouchableOpacity style={styles.addSet_button} onPress={addSet} >
                            <Text style={styles.buttonText}>
                                Add Set  <Icon name="plus-square" size={15} />
                            </Text>
                        </TouchableOpacity>
                    </View>

                </Collapsible>
            </DataTable>

            {/* <DataTable>
                <DataTable.Header>
                    <DataTable.Cell>Dumbell Shoulderpress</DataTable.Cell>

                    <DataTable.Title numeric>
                        <Icon name="chevron-down" size={15} color={"black"} />
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable> */}

            {exerciseList.map((item, index) => (
                <Exercise exerciseName={item}/>
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

            <ExerciseModal isModalVisible={isExerciseModalVisible}
                toggleExerciseModal={toggleExerciseModal}
                onExerciseSave={handleAddExercise}
            />


        </>
    )
};
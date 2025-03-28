import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { DataTable } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style.jsx';

import { useTrainContext } from '../context/TrainContext.jsx';

import Exercise from '../components/train/Exercise.jsx';

import Modal from '../components/modals/SetModal.jsx';
import ExerciseModal from '../components/modals/ExerciseModal.jsx';

export default function Train() {
    const { state, dispatch } = useTrainContext();

    const [rowOpen, setRowOpen] = useState(false);

    const toggleModal = () => {
        //setModalVisible(!isModalVisible);
        dispatch({type:"TOGGLE_MODAL", payload: { exerciseId: null, exerciseName: null}})
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
                    <TouchableOpacity onPress={toggleModal}><DataTable.Title>Exercise  <Icon name="plus-square" size={15} color={"green"} /></DataTable.Title></TouchableOpacity>
                    <DataTable.Title numeric>Weight (KG)</DataTable.Title>
                    <DataTable.Title numeric>Reps</DataTable.Title>
                </DataTable.Header>
            </DataTable>

            {state.exercises.map((item) => (
                <Exercise key={item.exerciseId} exerciseId={item.exerciseId} exerciseName={item.exerciseName}/>
            ))}

            <View style={{ flex: 1 }}>
                <ScrollView></ScrollView>
                <TouchableOpacity style={styles.finish_button} >
                    <Text style={styles.buttonText}><Icon name="flag-checkered" size={15} />  Finish Session  <Icon name="flag-checkered" size={15} /></Text>
                </TouchableOpacity>
            </View>

            <ExerciseModal/>


        </>
    )
};
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable, TextInput, Dimensions } from 'react-native'
import { DataTable } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { VictoryPie } from 'victory-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style.jsx';

import { useTrainContext } from '../context/TrainContext.jsx';

import Exercise from '../components/train/Exercise.jsx';
import LikertScale from '../components/LikertScale.jsx';
import MusclesWorkedChart from '../components/train/MusclesWorkedChart.jsx'

import Modal from '../components/modals/SetModal.jsx';
import ExerciseModal from '../components/modals/ExerciseModal.jsx';

export default function Train() {
    const { state, dispatch } = useTrainContext();

    const [rowOpen, setRowOpen] = useState(false);

    const [chartData, setChartData] = useState(state.exercises);

    const toggleModal = () => {
        dispatch({ type: "TOGGLE_MODAL", payload: { exerciseId: null, exerciseName: null } })
    };

    const finishWorkout = () => {
        dispatch({ type: "TOGGLE_FINISH_WORKOUT" })
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
        <ScrollView style={{ flex: 1 }}>
            {!state.finishWorkout ? (
                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                        <View>
                            <Text style={styles.name}>Push Day 1</Text>
                            <Text style={styles.timestamp}>Chest focused push day</Text>
                        </View>
                        <Pressable
                            onPress={() => toggleModal()}
                            style={{
                                backgroundColor: '#66c2a5',
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                borderRadius: 8
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Add Exercise</Text>
                        </Pressable>
                    </View>
                    <DataTable>
                        <DataTable.Header>
                            <TouchableOpacity onPress={toggleModal}><DataTable.Title>Exercise</DataTable.Title></TouchableOpacity>
                            <DataTable.Title numeric>Weight (KG)</DataTable.Title>
                            <DataTable.Title numeric>Reps</DataTable.Title>
                        </DataTable.Header>
                    </DataTable>

                    {state.exercises.map((item) => (
                        <Exercise key={item.exerciseId} exerciseId={item.exerciseId} exerciseName={item.exerciseName} />
                    ))}

                    <View style={{ flex: 1, padding: 16 }}>
                        <Pressable
                            onPress={() => finishWorkout()}
                            style={{
                                backgroundColor: '#3288bd',
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                borderRadius: 8
                            }}
                        >
                            <Text style={styles.buttonText}><Icon name="flag-checkered" size={15} />  Finish Session  <Icon name="flag-checkered" size={15} /></Text>
                        </Pressable>
                    </View>

                    <ExerciseModal />
                </>
            ) : (
                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                        <View>
                            <Text style={styles.name}>Finish Workout</Text>
                            <Text style={styles.timestamp}>Rate workout & View Summary</Text>
                        </View>
                        <Pressable
                            onPress={() => finishWorkout()}
                            style={{
                                backgroundColor: '#3288bd',
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                borderRadius: 8
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Back</Text>
                        </Pressable>
                    </View>
                    <Text style={[styles.textCenter, { fontSize: 18, marginTop: 7 }]}>Push Day 1</Text>
                    <View style={{ padding: 16 }}>
                        <LikertScale onSelect={(value) => console.log('Selected:', value)} />
                    </View>

                    <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
                        <Text style={[styles.name, { marginBottom: 8 }]}>Notes</Text>
                        <TextInput
                            placeholder="Write any notes about your workout..."
                            multiline
                            numberOfLines={4}
                            style={{
                                backgroundColor: '#fff',
                                borderColor: '#ccc',
                                borderWidth: 1,
                                borderRadius: 8,
                                padding: 12,
                                textAlignVertical: 'top',
                            }}
                        />
                    </View>

                    <View style={{ flex: 1, padding: 16 }}>
                        <Pressable
                            onPress={() => finishWorkout()}
                            style={{
                                backgroundColor: '#3288bd',
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                borderRadius: 8
                            }}
                        >
                            <Text style={styles.buttonText}>Save & Finish </Text>
                        </Pressable>
                    </View>
                </>
            )
            }
        </ScrollView >
    )
};
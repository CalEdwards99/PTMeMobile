import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, Pressable, Modal, ActivityIndicator } from 'react-native';
import { DataTable } from 'react-native-paper';
import WorkoutInfo from '../components/Workouts/WorkoutInfo.jsx';
import { useWorkoutContext } from '../context/WorkoutContext.jsx';

import styles from '../styles/style.jsx';

const WorkoutScreen = () => {

    const { state, dispatch } = useWorkoutContext();

    const [workoutName, setWorkoutName] = useState('');
    const [workoutDescription, setWorkoutDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const { getUserWorkouts, addUserWorkout } = useWorkoutContext();

    async function handleSaveWorkout() {
        addUserWorkout(workoutName, workoutDescription);
        setModalVisible(false);
    };

    //runs once or after reload TODO:reload.
    useEffect(() => {
        getUserWorkouts();
    }, []);

    const openModal = (muscle) => {
        setModalVisible(true);
    };

    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                <View>
                    <Text style={styles.name}>Your Workouts</Text>
                    <Text style={styles.timestamp}>Saved workouts</Text>
                </View>
                <Pressable
                    onPress={() => openModal()}
                    style={{
                        backgroundColor: '#66c2a5',
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 8
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>New Workout</Text>
                </Pressable>
            </View>
            <DataTable>
                <DataTable.Header>
                </DataTable.Header>
            </DataTable>
            {state.loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : state.workoutsList.length === 0 ? (
                <Text style={{justifyContent: 'center',alignItems:'center', padding:15}}>No saved workouts.</Text>
            ) : (
                state.workoutsList.map((item) => (
                    <WorkoutInfo
                        Key={item.Id}
                        WorkoutId={item.id}
                        Name={item.name}
                        Description={item.description}
                    />
                ))
            )}

            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>New Workout</Text>
                        <Text style={styles.modalText}>Workout Name:</Text>
                        <TextInput
                            value={String(workoutName)}
                            onChangeText={(val) => setWorkoutName(val)}
                            style={styles.input}
                            placeholder='Workout Name'
                        />
                        <Text style={styles.modalText}>Description:</Text>
                        <TextInput
                            value={String(workoutDescription)}
                            onChangeText={(val) => setWorkoutDescription(val)}
                            style={styles.input}
                            placeholder='Description'
                        />
                        <Pressable onPress={() => handleSaveWorkout()} style={{
                            backgroundColor: '#66c2a5',
                            paddingVertical: 6,
                            paddingHorizontal: 12,
                            borderRadius: 8
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Save</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default WorkoutScreen;

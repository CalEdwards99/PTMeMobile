import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Pressable, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useWorkoutContext } from '../../context/WorkoutContext.jsx';

import ListSet from '../train/Set.jsx';
import styles from '../../styles/style.jsx';
import SetModal from '../modals/SetModal.jsx';

const WorkoutInfo = ({ Key, WorkoutId, Name, Description }) => {
    const { state, dispatch, deleteUserWorkout } = useWorkoutContext();

    const [chevron, setChevron] = useState("chevron-down");
    const [rowOpen, setRowOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);

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

    async function handleDeleteWorkout(workoutId) {
        deleteUserWorkout(workoutId)
        setModalVisible(false);
    };

    function openModal(){
        setModalVisible(true);
    };

    // const addSet = () => {
    //     dispatch({ type: "TOGGLESET_MODAL", payload: { exerciseId: exerciseId, setNo: null, reps: null, weight: null } });
    // }

    // const handleEditExercise = () => {
    //     dispatch({ type: "TOGGLE_MODAL", payload: { exerciseId: exerciseId, exerciseName: exerciseName } });
    // };

    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>{Name}</Text></DataTable.Cell>
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

                <DataTable.Row>
                    <TouchableOpacity onPress={null}><DataTable.Cell><Text style={styles.linkUnderline}>BB Benchpress</Text></DataTable.Cell></TouchableOpacity>
                    <DataTable.Cell numeric></DataTable.Cell>
                    <DataTable.Cell numeric>4 Sets</DataTable.Cell>
                </DataTable.Row>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.editworkout_button} onPress={null}>
                        <Text style={styles.buttonText}>
                            Edit  <Icon name="pencil" size={15} />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete_button} onPress={openModal}>
                        <Text style={styles.buttonText}>
                            Delete  <Icon name="trash-o" size={15} />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addSet_button} onPress={null}>
                        <Text style={styles.buttonText}>
                            Train  <Icon name="hand-o-right" size={15} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </Collapsible>

                        {/* Modal */}
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Workout</Text>
                                    <Text style={styles.modalText}>Workout Name:</Text>
                                    <TextInput
                                        value={String(Name)}
                                        onChangeText={(val) => setWorkoutName(val)}
                                        style={styles.input}
                                        placeholder='Workout Name'
                                    />
                                    <Text style={styles.modalText}>Description:</Text>
                                    <TextInput
                                        value={String(Description)}
                                        onChangeText={(val) => setWorkoutDescription(val)}
                                        style={styles.input}
                                        placeholder='Description'
                                    />
                                    <Pressable onPress={() => handleDeleteWorkout(WorkoutId)} style={{
                                        backgroundColor: '#66c2a5',
                                        paddingVertical: 6,
                                        paddingHorizontal: 12,
                                        borderRadius: 8
                                    }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Delete</Text>
                                    </Pressable>
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

        </>
    );
};

export default WorkoutInfo;

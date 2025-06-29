import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Pressable, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useWorkoutContext } from '../../context/WorkoutContext.jsx';
import { useNavigation } from '@react-navigation/native';

import ListSet from '../train/Set.jsx';
import styles from '../../styles/style.jsx';
import SetModal from '../modals/SetModal.jsx';

const WorkoutInfo = ({ Key, WorkoutId, Name, Description }) => {
    const { state, dispatch, updateUserWorkout, deleteUserWorkout } = useWorkoutContext();
    const navigation = useNavigation();

    const [workoutId, setWorkoutId] = useState(WorkoutId);
    const [workoutName, setWorkoutName] = useState(Name);
    const [workoutDescription, setWorkoutDescription] = useState(Description);

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

    async function handleUpdateWorkout() {
        updateUserWorkout(workoutId, workoutName, workoutDescription)
        setModalVisible(false);
    }

    async function handleDeleteWorkout() {
        deleteUserWorkout(workoutId)
        setModalVisible(false);
    };

    function openModal() {
        setModalVisible(true);
    };

    const trainWorkout = () =>{
        navigation.navigate('Train', { selectedWorkout: workoutId, workoutName: workoutName, workoutDescription: workoutDescription });
    };

    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>{workoutName}</Text></DataTable.Cell>
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
                    <TouchableOpacity style={styles.edit_button} onPress={openModal}>
                        <Text style={styles.buttonText}>
                            Edit  <Icon name="pencil" size={15} />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete_button} onPress={openModal}>
                        <Text style={styles.buttonText}>
                            Delete  <Icon name="trash-o" size={15} />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submit_button} onPress={trainWorkout}>
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

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => handleUpdateWorkout(workoutId)} style={styles.modalSaveButton}>
                                <Text style={styles.modalButtonText}>Save</Text>
                            </Pressable>
                            <Pressable onPress={() => handleDeleteWorkout(workoutId)} style={styles.modalDeleteButton}>
                                <Text style={styles.modalButtonText}>Delete</Text>
                            </Pressable>
                            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeText}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

        </>
    );
};

export default WorkoutInfo;

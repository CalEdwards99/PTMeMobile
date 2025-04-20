import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Pressable, Modal } from 'react-native';
import { DataTable } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style.jsx';

const WorkoutScreen = () => {

    const [chevron, setChevron] = useState("chevron-down");
    const [rowOpen, setRowOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    const [workoutName, setWorkoutName] = useState('');
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
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>Push Day 1</Text></DataTable.Cell>
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
                <DataTable.Row>
                    <TouchableOpacity onPress={null}><DataTable.Cell><Text style={styles.linkUnderline}>Tricep Pushdown</Text></DataTable.Cell></TouchableOpacity>
                    <DataTable.Cell numeric></DataTable.Cell>
                    <DataTable.Cell numeric>3 Sets</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <TouchableOpacity onPress={null}><DataTable.Cell><Text style={styles.linkUnderline}>DB Shoulder-Press</Text></DataTable.Cell></TouchableOpacity>
                    <DataTable.Cell numeric></DataTable.Cell>
                    <DataTable.Cell numeric>3 Sets</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <TouchableOpacity onPress={null}><DataTable.Cell><Text style={styles.linkUnderline}>Cable Lat-Raises</Text></DataTable.Cell></TouchableOpacity>
                    <DataTable.Cell numeric></DataTable.Cell>
                    <DataTable.Cell numeric>2 Sets</DataTable.Cell>
                </DataTable.Row>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.editworkout_button} onPress={null}>
                        <Text style={styles.buttonText}>
                            Edit  <Icon name="pencil" size={15} />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete_button} onPress={null}>
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
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>Pull Day 1</Text></DataTable.Cell>
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={null}>
                            <View style={styles.icon_button}>
                                <Icon name="chevron-down" size={15} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>Leg Day 1</Text></DataTable.Cell>
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={null}>
                            <View style={styles.icon_button}>
                                <Icon name="chevron-down" size={15} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>Recovery Arms Session</Text></DataTable.Cell>
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={null}>
                            <View style={styles.icon_button}>
                                <Icon name="chevron-down" size={15} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>

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
                        />

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

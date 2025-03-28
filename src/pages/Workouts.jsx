import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style.jsx';

const WorkoutScreen = () => {

    const [chevron, setChevron] = useState("chevron-down");
    const [rowOpen, setRowOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

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

    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <TouchableOpacity><DataTable.Title><Text style={styles.underlineTitle}>Workout</Text></DataTable.Title></TouchableOpacity>
                    <DataTable.Title numeric></DataTable.Title>
                    <DataTable.Title numeric></DataTable.Title>
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
        </>
    );
};

export default WorkoutScreen;

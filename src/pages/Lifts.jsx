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

    const [favourite, setFavourite] = useState("grey")

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

    const FavouriteExercise = () => {
        if(favourite == "red"){ setFavourite("grey"); }
        if(favourite == "grey"){ setFavourite("red"); }
    }

    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <TouchableOpacity><DataTable.Title><Text style={styles.underlineTitle}>Exercise</Text></DataTable.Title></TouchableOpacity>
                    <DataTable.Title numeric>Progress</DataTable.Title>
                    <DataTable.Title numeric>ORM</DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>BB Bench</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text><Icon name="line-chart" size={15} color={"green"} /> 8.2 Kg</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text> 111.8 Kg</Text></DataTable.Cell>
                    {/* <DataTable.Title numeric>
                        <TouchableOpacity onPress={OpenRowHandler}>
                            <View style={styles.icon_button}>
                                <Icon name={chevron} size={15} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title> */}
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={FavouriteExercise}>
                            <View style={styles.icon_button}>
                                <Icon name="heart" size={15} color={favourite} />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <Collapsible collapsed={collapsed} duration={475}>

                {/* <DataTable.Row>
                    <TouchableOpacity onPress={null}><DataTable.Cell><Text style={styles.linkUnderline}>Top-Set</Text></DataTable.Cell></TouchableOpacity>
                    <DataTable.Cell numeric><Text style={styles.linkUnderline}>E-ORM</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.linkUnderline}>%</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.linkUnderline}>Date</Text></DataTable.Cell>
                    
                </DataTable.Row>
                <DataTable.Row>
                    <TouchableOpacity onPress={null}><DataTable.Cell><Text>90 Kg x 8</Text></DataTable.Cell></TouchableOpacity>
                    <DataTable.Cell numeric>118.8 Kg</DataTable.Cell>
                    <DataTable.Cell numeric> 8.6%</DataTable.Cell>
                    <DataTable.Cell numeric>25/3/25</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <TouchableOpacity onPress={null}><DataTable.Cell><Text>85 Kg x 9</Text></DataTable.Cell></TouchableOpacity>
                    <DataTable.Cell numeric>109.4 Kg</DataTable.Cell>
                    <DataTable.Cell numeric> 3.2%</DataTable.Cell>
                    <DataTable.Cell numeric>23/2/25</DataTable.Cell>
                    
                </DataTable.Row>

                <DataTable.Row>
                    <TouchableOpacity onPress={null}><DataTable.Cell><Text>87.5 Kg x 8</Text></DataTable.Cell></TouchableOpacity>
                    <DataTable.Cell numeric>108.8</DataTable.Cell>
                    <DataTable.Cell numeric> 3.2%</DataTable.Cell>
                    <DataTable.Cell numeric>27/1/25</DataTable.Cell>
                </DataTable.Row> */}

                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                </View> */}
            </Collapsible>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>Squat</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text><Icon name="line-chart" size={15} color={"green"} /> 12.1 Kg</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text> 141.2 Kg</Text></DataTable.Cell>
                    {/* <DataTable.Title numeric>
                        <TouchableOpacity onPress={null}>
                            <View style={styles.icon_button}>
                                <Icon name="chevron-down" size={15} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title> */}
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={FavouriteExercise}>
                            <View style={styles.icon_button}>
                                <Icon name="heart" size={15} color="red" />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>DB Shoulder-Press</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text><Icon name="line-chart" size={15} color={"green"} /> 4.2 Kg</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text> 79.5 Kg</Text></DataTable.Cell>
                    {/* <DataTable.Title numeric>
                        <TouchableOpacity onPress={null}>
                            <View style={styles.icon_button}>
                                <Icon name="chevron-down" size={15} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title> */}
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={FavouriteExercise}>
                            <View style={styles.icon_button}>
                                <Icon name="heart" size={15} color="red" />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>Hip-Thrusts</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text><Icon name="line-chart" size={15} color={"green"} /> 10.5 Kg</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text> 140.0 Kg</Text></DataTable.Cell>
                    {/* <DataTable.Title numeric>
                        <TouchableOpacity onPress={null}>
                            <View style={styles.icon_button}>
                                <Icon name="chevron-down" size={15} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title> */}
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={FavouriteExercise}>
                            <View style={styles.icon_button}>
                                <Icon name="heart" size={15} color="red" />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>
        </>
    );
};

export default WorkoutScreen;

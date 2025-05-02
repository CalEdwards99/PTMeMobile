import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style.jsx';

const WorkoutScreen = () => {

    const [chevron, setChevron] = useState("chevron-down");
    const [rowOpen, setRowOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    const [favourite, setFavourite] = useState("grey")

    const [searchQuery, setSearchQuery] = useState('');

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
        if (favourite == "red") { setFavourite("grey"); }
        if (favourite == "grey") { setFavourite("red"); }
    }

    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                <View>
                    <Text style={styles.name}>Favourites</Text>
                    <Text style={styles.timestamp}>Track progress of your preferred exercises</Text>
                </View>
            </View>
            <DataTable>
                <DataTable.Header>
                    <TouchableOpacity><DataTable.Title><Text style={styles.underlineTitle}>Exercise</Text></DataTable.Title></TouchableOpacity>
                    <DataTable.Title numeric>Progress</DataTable.Title>
                    <DataTable.Title numeric>1RM</DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>BB Bench</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text><Icon name="line-chart" size={15} color={"green"} /> 8.2 Kg</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text> 111.8 Kg</Text></DataTable.Cell>
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
            </Collapsible>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>Squat</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text><Icon name="line-chart" size={15} color={"green"} /> 12.1 Kg</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text> 141.2 Kg</Text></DataTable.Cell>
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
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={FavouriteExercise}>
                            <View style={styles.icon_button}>
                                <Icon name="heart" size={15} color="red" />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                <View>
                    <Text style={styles.name}>Exercises</Text>
                    <Text style={styles.timestamp}>Track progress of 1 rep maxes</Text>
                </View>

                <TextInput
                placeholder="Search Exercises"
                value={searchQuery}
                onChangeText={setSearchQuery}
                mode="flat"
            />
            </View>

            <DataTable>
                <DataTable.Header>
                    <TouchableOpacity><DataTable.Title><Text style={styles.underlineTitle}>Exercise</Text></DataTable.Title></TouchableOpacity>
                    <DataTable.Title numeric>Progress</DataTable.Title>
                    <DataTable.Title numeric>1RM</DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>Preacher Curl</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text><Icon name="line-chart" size={15} color={"green"} /> 2.0 Kg</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text> 20 Kg</Text></DataTable.Cell>
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={FavouriteExercise}>
                            <View style={styles.icon_button}>
                                <Icon name="heart" size={15} color={"grey"} />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <Collapsible collapsed={collapsed} duration={475}>
            </Collapsible>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>Zercher Squats</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text><Icon name="line-chart" size={15} color={"green"} /> 8.0 Kg</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text> 115.0 Kg</Text></DataTable.Cell>
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={FavouriteExercise}>
                            <View style={styles.icon_button}>
                                <Icon name="heart" size={15} color="grey" />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>Hack-Squat</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text><Icon name="line-chart" size={15} color={"green"} /> 5.0 Kg</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text> 155 Kg</Text></DataTable.Cell>
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={FavouriteExercise}>
                            <View style={styles.icon_button}>
                                <Icon name="heart" size={15} color="grey" />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell><Text style={styles.linkUnderlineTitle}>Tricep Dips</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text><Icon name="line-chart" size={15} color={"green"} /> 2.0 Kg</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text> 2.0 Kg</Text></DataTable.Cell>
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={FavouriteExercise}>
                            <View style={styles.icon_button}>
                                <Icon name="heart" size={15} color="grey" />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>
        </ScrollView>
    );
};

export default WorkoutScreen;

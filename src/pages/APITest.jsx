import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style.jsx';
import { getItems } from '../API/Items.jsx';

const APITest = () => {
    const [items, setItems] = useState([]);
    const [reload, setReload] = useState(false); // Add a state for reload functionality

    // Fetch data when component mounts or reload changes
    useEffect(() => {
        const fetchItems = async () => {
            const data = await getItems();
            setItems(data);
          };

        fetchItems(); // Fetch the items when component mounts or reload changes
    }, [reload]);

    // Reload function to trigger re-fetching data
    const reloadItems = () => {
        console.log("Reloading data...");
        setReload(prevState => !prevState); // Toggle reload state to trigger useEffect
    };

    return (
        <>
            <TouchableOpacity style={styles.editworkout_button} onPress={reloadItems}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.buttonText}>Edit</Text>
                    <Icon name="pencil" size={15} style={{ marginLeft: 5 }} />
                </View>
            </TouchableOpacity>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Item Name</DataTable.Title>
                    <DataTable.Title numeric>Description</DataTable.Title>
                </DataTable.Header>

                {items.length > 0 ? (
                    items.map((item, index) => (
                        <DataTable.Row key={item.id}> {/* Use the item's id as the key */}
                            <DataTable.Cell>
                                <TouchableOpacity onPress={() => console.log("Editing", item.name)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            </DataTable.Cell>
                            <DataTable.Cell>
                                <TouchableOpacity onPress={() => console.log("Blah", item.description)}>
                                <Text>{item.description}</Text>
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))
                ) : (
                    <DataTable.Row>
                        <DataTable.Cell>No items available</DataTable.Cell>
                    </DataTable.Row>
                )}
            </DataTable>
        </>
    );
};

export default APITest;

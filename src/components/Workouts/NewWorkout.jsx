import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../styles/style.jsx';


const Workout = () => {
    return (
        <>
            <TextInput
                style={styles.input}
                placeholder="Workout Name"
                value={newWorkout}
                onChangeText={(text) => setNewWorkout(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Exercise"
                value={newWorkout}
                onChangeText={(text) => setNewWorkout(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Reps"
                value={newWorkout}
                onChangeText={(text) => setNewWorkout(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Sets"
                value={newWorkout}
                onChangeText={(text) => setNewWorkout(text)}
            />
            <TouchableOpacity style={styles.button} onPress={saveWorkout}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </>

    )
}

export default Workout;
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style.jsx';

const WorkoutScreen = ({ navigation }) => {
    const [Workouts, SetWorkouts] = useState([]);
    const [newWorkoutVisible, setNewWorkoutVisible] = useState(false); 
    const [newWorkout, setNewWorkout] = useState('');

    const addNewWorkout = () => {
        setNewWorkoutVisible(true);
    };

    const saveWorkout = () => {
        if (newWorkout.trim()) { // Ensure the input isn't just whitespace
            SetWorkouts([...Workouts, newWorkout]);
            setNewWorkoutVisible(false);
            setNewWorkout('');
        } else {
            alert('Please enter a valid workout name!');
        }
    };

    return (
        <>
            {newWorkoutVisible ? (
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new workout"
                        value={newWorkout}
                        onChangeText={(text) => setNewWorkout(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={saveWorkout}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.container}>
                    {Workouts.length > 0 ? (
                        Workouts.map((workout, index) => (
                            <Text key={index} style={[styles.textCenter, { fontSize: 20, marginTop: 30 }]}>
                                {workout}
                            </Text>
                        ))
                    ) : (
                        <Text>No workouts available</Text>
                    )}
                </View>
            )}

        {!newWorkoutVisible &&

            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={addNewWorkout}>
                    <Text style={styles.buttonText}>Create Workout   <Icon name="pencil" size={17} color={"white"} /></Text>
                </TouchableOpacity>
            </View>
        }
        </>
    );
};

export default WorkoutScreen;

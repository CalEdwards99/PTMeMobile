import React from 'react';
import {View, Text, Button} from 'react-native';

import styles from '../styles/style.jsx';

const WorkoutScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Filler Text, want to fill this with completed workouts</Text>
            <Text>Imagine A Feed like Strava but with your friends</Text>
            <Text>Want users to be able to like others workouts</Text>
        </View>
    )    
}

export default WorkoutScreen
import React from 'react';
import {View, Text, Button} from 'react-native';

import styles from '../styles/style.jsx';

const WorkoutScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Filler Text, want to fill this with Weight across</Text>
            <Text>Underneath this another chart, for exercise totals</Text>
            <Text>Lastly (Maybe) a chart of last 7 days of Gym</Text>
        </View>
    )    
}

export default WorkoutScreen
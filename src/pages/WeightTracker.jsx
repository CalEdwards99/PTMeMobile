import React ,{ useState, useEffect } from 'react';
import { View, Text, Button, Animated } from 'react-native';

import styles from '../styles/style.jsx';
import ChartsSection from '../components/WeightChart.jsx';

const WeightTracker = () => {

    const [fadeAnim] = useState(new Animated.Value(0)); // Animated value for fade-in effect

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <>
            <Text style={[styles.textCenter, { fontSize: 20, marginTop: 30 }]}>Weight (Kilos)</Text>
            <Animated.View style={{ opacity: fadeAnim }}>
                <ChartsSection />
            </Animated.View>
        </>
    )
}

export default WeightTracker;

import React, { useState } from 'react';
import { View, Dimensions, Modal, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { VictoryPie } from 'victory-native';
import { DataTable, Provider as PaperProvider } from 'react-native-paper';

const muscleColorMap = {
    Hamstrings: "#9e0142",   // Red
    Quads: "#d53e4f",        // Dark Red
    Chest: "#f46d43",        // Orange (instead of always blue)
    Back: "#fdae61",         // Light Orange
    Shoulders: "#fee08b",    // Yellow
    Biceps: "#e6f598",       // Pale Yellow-Green
    Triceps: "#abdda4",      // Light Green
    Calves: "#66c2a5",       // Teal
    Traps: "#3288bd",        // Blue
    Forearms: "#5e4fa2"      // Purple
};

const muscleData = [
    { x: "Hamstrings", y: 20, sets: 120, topExercises: [{ name: 'Romanian Deadlift', sets: 40 }, { name: 'Leg Curl', sets: 45 }, { name: 'Glute Bridge', sets: 35 }] },
    { x: "Quads", y: 25, sets: 135, topExercises: [{ name: 'Back Squat', sets: 55 }, { name: 'Leg Press', sets: 45 }, { name: 'Lunges', sets: 35 }] },
    { x: "Chest", y: 18, sets: 90, topExercises: [{ name: 'Bench Press', sets: 50 }, { name: 'Incline Press', sets: 25 }, { name: 'Dumbbell Fly', sets: 15 }] },
    { x: "Back", y: 22, sets: 105, topExercises: [{ name: 'Deadlift', sets: 45 }, { name: 'Pull-Ups', sets: 30 }, { name: 'Row Machine', sets: 30 }] },
    { x: "Shoulders", y: 15, sets: 70, topExercises: [{ name: 'Overhead Press', sets: 30 }, { name: 'Lateral Raise', sets: 20 }, { name: 'Face Pulls', sets: 20 }] },
    { x: "Biceps", y: 12, sets: 60, topExercises: [{ name: 'Barbell Curl', sets: 25 }, { name: 'Hammer Curl', sets: 20 }, { name: 'Concentration Curl', sets: 15 }] },
    { x: "Triceps", y: 10, sets: 55, topExercises: [{ name: 'Dips', sets: 20 }, { name: 'Skull Crushers', sets: 20 }, { name: 'Triceps Pushdown', sets: 15 }] },
    { x: "Calves", y: 8, sets: 40, topExercises: [{ name: 'Calf Raise', sets: 25 }, { name: 'Seated Calf Raise', sets: 10 }, { name: 'Smith Machine Calf', sets: 5 }] },
    { x: "Traps", y: 5, sets: 30, topExercises: [{ name: 'Barbell Shrugs', sets: 15 }, { name: 'Dumbbell Shrugs', sets: 10 }, { name: 'Upright Row', sets: 5 }] },
    { x: "Forearms", y: 5, sets: 25, topExercises: [{ name: 'Wrist Curl', sets: 10 }, { name: 'Reverse Curl', sets: 10 }, { name: 'Farmer’s Carry', sets: 5 }] }
];

const sessionMuscleMap = {
    "Push-Day - 18/04/2025": [muscleData[2], muscleData[4], muscleData[6]], 
    "Pull-Day - 17/04/2025": [muscleData[3], muscleData[5], muscleData[8]], 
    "Leg-Day - 16/04/2025": [muscleData[0], muscleData[1], muscleData[7]], 
    "Chest & Triceps - 15/04/2025": [muscleData[2], muscleData[6]],
    "Back & Biceps - 14/04/2025": [muscleData[3], muscleData[5]],
};

const workoutSessions = [
    { session: "Push-Day - 18/04/2025" },
    { session: "Pull-Day - 17/04/2025" },
    { session: "Leg-Day - 16/04/2025" },
    { session: "Chest & Triceps - 15/04/2025" },
    { session: "Back & Biceps - 14/04/2025" },
];

const MuscleGroupPieChart = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [chartData, setChartData] = useState(muscleData);

    const openModal = (muscle) => {
        setSelectedMuscle(muscle);
        setModalVisible(true);
    };

    // Calculate the total sets for calculating percentage
    const totalSets = chartData.reduce((total, muscle) => total + muscle.y, 0);

    return (
        <PaperProvider>
            <ScrollView style={{ flex: 1 }}>
                <View>
                    {/* Pie Chart Card */}
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                            <View>
                                <Text style={styles.name}>Muscle Workout Frequency</Text>
                                <Text style={styles.timestamp}>What Muscle-groups you train the most</Text>
                            </View>
                            <Pressable
                                onPress={() => setChartData(muscleData)}
                                style={{
                                    backgroundColor: '#66c2a5',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    borderRadius: 8
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>All Workouts</Text>
                            </Pressable>
                        </View>

                        {chartData.length === 0 ? (
                            <View style={{ alignItems: 'center', padding: 20 }}>
                                <Text style={{ fontSize: 16, color: 'gray' }}>No data for this session.</Text>
                            </View>
                        ) : (
                            <VictoryPie
                                data={chartData}
                                animate={{
                                    duration: 500,
                                    easing: "circleIn"
                                }}
                                width={Dimensions.get("window").width}
                                height={300}
                                labels={({ datum }) => {
                                    const percentage = ((datum.y / totalSets) * 100).toFixed(1);
                                    return `${datum.x}\n${percentage}%`; // Display the percentage
                                }}
                                events={[{
                                    target: "data",
                                    eventHandlers: {
                                        onPressIn: (_, props) => {
                                            const muscle = muscleData[props.index];
                                            return [{
                                                target: "data",
                                                mutation: () => {
                                                    openModal(muscle);
                                                }
                                            }];
                                        }
                                    }
                                }]}
                                style={{
                                    labels: { fontSize: 12, fill: "#333", textAlign: "center" },
                                    data: {
                                        fill: ({ datum }) => muscleColorMap[datum.x] || "#ccc"
                                    },
                                }}
                                padding={{ top: 20, bottom: 30, left: 40, right: 40 }}
                                innerRadius={40}
                                labelRadius={({ innerRadius }) => innerRadius + 30}
                            />
                        )}
                    </View>

                    {/* Workout Sessions Card */}
                    <View>
                        <View style={{ padding: 16 }}>
                            <Text style={styles.name}>Completed Sessions</Text>
                            <Text style={styles.timestamp}>Your completed workout sessions</Text>
                        </View>
                        <DataTable>
                            <DataTable.Header>
                            </DataTable.Header>
                            {workoutSessions.map((item, index) => (
                                <DataTable.Row
                                    key={index}
                                    onPress={() => {
                                        const data = sessionMuscleMap[item.session] || [];
                                        setChartData(data);
                                    }}
                                >
                                    <DataTable.Cell>{item.session}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </View>
                </View>

                {/* Modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            {selectedMuscle && (
                                <>
                                    <Text style={styles.modalTitle}>{selectedMuscle.x}</Text>
                                    <Text style={styles.modalText}>Workout %: {selectedMuscle.y}%</Text>
                                    <Text style={styles.modalText}>Total Sets: {selectedMuscle.sets}</Text>

                                    <Text style={styles.modalSubtitle}>Top Exercises:</Text>
                                    <DataTable>
                                        <DataTable.Header>
                                            <DataTable.Title>Exercise</DataTable.Title>
                                            <DataTable.Title numeric>Sets</DataTable.Title>
                                        </DataTable.Header>
                                        {selectedMuscle.topExercises.map((exercise, index) => (
                                            <DataTable.Row key={index}>
                                                <DataTable.Cell>{exercise.name}</DataTable.Cell>
                                                <DataTable.Cell numeric>{exercise.sets}</DataTable.Cell>
                                            </DataTable.Row>
                                        ))}
                                    </DataTable>

                                    <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                        <Text style={styles.closeText}>Close</Text>
                                    </Pressable>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    modalSubtitle: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '600',
    },
    modalText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
        backgroundColor: '#ccc',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    closeText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    name: {
        fontWeight: 'bold',
    },
    timestamp: {
        color: 'gray',
        fontSize: 12,
    },
});

export default MuscleGroupPieChart;

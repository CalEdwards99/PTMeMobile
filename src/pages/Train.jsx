import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable, TextInput, Dimensions } from 'react-native'
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style.jsx';

import { useTrainContext } from '../context/TrainContext.jsx';

import Exercise from '../components/train/Exercise.jsx';
import LikertScale from '../components/LikertScale.jsx';
import ExerciseModal from '../components/modals/ExerciseModal.jsx';

import { useRoute } from '@react-navigation/native';


export default function Train() {
    const route = useRoute();
    const workoutId = route.params?.selectedWorkout;
    const workoutName = route.params?.workoutName;
    const workoutDescription = route.params?.workoutName;

    const { state, dispatch, getTrainWorkout, getExerciseList, saveWorkoutSession } = useTrainContext();
    const [rowOpen, setRowOpen] = useState(false);
    const [chartData, setChartData] = useState(state.exercises);

    const toggleModal = () => {
        dispatch({ type: "TOGGLE_MODAL", payload: { uniqueId: null, exerciseId: null, exerciseName: null } })
    };

    const finishWorkout = () => {
        dispatch({ type: "TOGGLE_FINISH_WORKOUT" })
    };

    const saveWorkout = () => {
        saveWorkoutSession();
    }

    const TempWorkoutSummary = () => {
        dispatch({ type: "VIEW_WORKOUT_SUMMARY" })
    }

    const TempFinishWorkoutSummary = () => {
        dispatch({ type: "FINISH_WORKOUT_SUMMARY" })
        navigation.navigate('Home');
    }

    const updateWorkoutRating = (rating) => {
        dispatch({ type: "RATE_WORKOUT", payload: rating })
    }

    const updateSessionNotes = (notes) => {
        dispatch({ type: "SESSION_NOTES", payload: notes })
    }

    const updateSessionName = (sessionName) => {
        dispatch({ type: "SESSION_NAME", payload: sessionName })
    }

    function OpenRowHandler() {
        {
            rowOpen ? (
                setChevron('chevron-up'),
                setRowOpen(false),
                setCollapsed(false)
            ) : (
                setChevron('chevron-down'),
                setRowOpen(true),
                setCollapsed(true)
            )
        }
    }

    //runs once or after reload TODO:reload.
    useEffect(() => {
        console.log("using effect to get train workout: " + workoutId)
        if (workoutId) {

            getTrainWorkout(workoutId);
        }
        else{
            updateSessionName("Freestyle")
        }

        console.log("getting exercise list");
        getExerciseList();

    }, []);

    useEffect(() => {
        if (state.saved) {
            navigation.navigate('WorkoutSummary', { workoutId: state.workoutId }); // or whatever screen
        }
    }, [state.saved]);

    const hasCompletedSets = state.exercises?.some(exercise =>
        exercise.sets?.some(set => set.weight != null && set.reps != null)
    );

    const sessionName = route.params?.workoutName || 'Train';
    const sessionDescription = route.params?.workoutDescription || 'Freestyle workout';


    return (
        <ScrollView style={{ flex: 1 }}>
            {state.workoutSummary ? (
                <>
                    {/* Summary View */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                        <View>
                            <Text style={styles.name}>{sessionName} : Workout Summary</Text>
                            <Text style={styles.timestamp}>{sessionDescription}</Text>
                        </View>
                    </View>

                    {state.exercises && state.exercises.length > 0 && (
                        <>
                            <DataTable>
                                <DataTable.Header>
                                    <TouchableOpacity><DataTable.Title>Exercise</DataTable.Title></TouchableOpacity>
                                    <DataTable.Title numeric>Sets</DataTable.Title>
                                    <DataTable.Title numeric>Volume</DataTable.Title>
                                </DataTable.Header>
                            </DataTable>

                            {state.exercises.map((item) => (
                                <Exercise
                                    key={item.uniqueId}
                                    uniqueId={item.uniqueId}
                                    exerciseId={item.exerciseId}
                                    exerciseName={item.exerciseName}
                                />
                            ))}

                            <DataTable>
                                <DataTable.Header>
                                    <TouchableOpacity><DataTable.Title>Exercise</DataTable.Title></TouchableOpacity>
                                    <DataTable.Title numeric>Sets</DataTable.Title>
                                    <DataTable.Title numeric>Volume</DataTable.Title>
                                </DataTable.Header>
                            </DataTable>

                            <View style={{ flex: 1, padding: 16 }}>
                                <Pressable
                                    onPress={TempFinishWorkoutSummary}
                                    style={{
                                        backgroundColor: '#3288bd',
                                        paddingVertical: 6,
                                        paddingHorizontal: 12,
                                        borderRadius: 8
                                    }}
                                >
                                    <Text style={styles.buttonText}> Done </Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                </>
            ) : (
                <>
                    {!state.finishWorkout ? (
                        <>
                            {/* Training view */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                                <View>
                                    <Text style={styles.name}>{sessionName}</Text>
                                    <Text style={styles.timestamp}>{sessionDescription}</Text>
                                </View>
                                <Pressable
                                    onPress={toggleModal}
                                    style={{
                                        backgroundColor: '#66c2a5',
                                        paddingVertical: 6,
                                        paddingHorizontal: 12,
                                        borderRadius: 8
                                    }}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Add Exercise</Text>
                                </Pressable>
                            </View>

                            {state.exercises && state.exercises.length > 0 && (
                                <>
                                    <DataTable>
                                        <DataTable.Header>
                                            <TouchableOpacity><DataTable.Title>Exercise</DataTable.Title></TouchableOpacity>
                                            <DataTable.Title numeric>Weight (KG)</DataTable.Title>
                                            <DataTable.Title numeric>Reps</DataTable.Title>
                                        </DataTable.Header>
                                    </DataTable>

                                    {state.exercises.map((item) => (
                                        <Exercise
                                            key={item.uniqueId}
                                            uniqueId={item.uniqueId}
                                            exerciseId={item.exerciseId}
                                            exerciseName={item.exerciseName}
                                        />
                                    ))}

                                    {hasCompletedSets && (
                                        <View style={{ flex: 1, padding: 16 }}>
                                            <Pressable
                                                onPress={finishWorkout}
                                                style={{
                                                    backgroundColor: '#3288bd',
                                                    paddingVertical: 6,
                                                    paddingHorizontal: 12,
                                                    borderRadius: 8
                                                }}
                                            >
                                                <Text style={styles.buttonText}>
                                                    <Icon name="flag-checkered" size={15} /> Finish Session <Icon name="flag-checkered" size={15} />
                                                </Text>
                                            </Pressable>
                                        </View>
                                    )}
                                </>
                            )}
                            <ExerciseModal />
                        </>
                    ) : (
                        <>
                            {/* Finish workout view */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                                <View>
                                    <Text style={styles.name}>Finish Workout</Text>
                                    <Text style={styles.timestamp}>Rate workout & View Summary</Text>
                                </View>
                                <Pressable
                                    onPress={finishWorkout}
                                    style={{
                                        backgroundColor: '#3288bd',
                                        paddingVertical: 6,
                                        paddingHorizontal: 12,
                                        borderRadius: 8
                                    }}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Back</Text>
                                </Pressable>
                            </View>                                               

                            <View style={{ paddingHorizontal: 16, paddingVertical: 6 }}>
                                <LikertScale onSelect={(value) => updateWorkoutRating(value)} />
                            </View>

                            <View style={{ paddingHorizontal: 16 }}>
                            <Text style={[styles.name, { marginBottom: 8 }]}>Workout Title</Text>
                            <TextInput
                                    placeholder="Name this workout..."
                                    onChangeText={updateSessionName}
                                    value={state.workoutSessionName}
                                    style={{
                                        backgroundColor: '#fff',
                                        borderColor: '#ccc',
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        padding: 12,
                                        textAlignVertical: 'top',
                                    }}
                                />
                            </View>

                            <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
                                <Text style={[styles.name, { marginBottom: 8 }]}>Notes</Text>
                                <TextInput
                                    placeholder="Write any notes about your workout..."
                                    multiline
                                    numberOfLines={4}
                                    onChangeText={updateSessionNotes}
                                    style={{
                                        backgroundColor: '#fff',
                                        borderColor: '#ccc',
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        padding: 12,
                                        textAlignVertical: 'top',
                                    }}
                                />
                            </View>

                            <View style={{ flex: 1, padding: 16 }}>
                                <Pressable
                                    onPress={saveWorkout}
                                    //onPress={TempWorkoutSummary}
                                    style={{
                                        backgroundColor: '#3288bd',
                                        paddingVertical: 6,
                                        paddingHorizontal: 12,
                                        borderRadius: 8
                                    }}
                                >
                                    <Text style={styles.buttonText}>Save & Finish</Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                </>
            )}
        </ScrollView>
    );

};
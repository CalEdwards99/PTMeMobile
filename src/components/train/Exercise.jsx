import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTrainContext } from '../../context/TrainContext.jsx';

import ListSet from '../train/Set.jsx';
import styles from '../../styles/style.jsx';
import SetModal from '../modals/SetModal.jsx';

const Exercise = ({ uniqueId, exerciseId, exerciseName }) => {
    const { state, dispatch } = useTrainContext();

    // const [Id, setExerciseId] = useState(exerciseId);
    // const [exercise, setExercise] = useState(exerciseName);

    const [chevron, setChevron] = useState("chevron-down");
    const [rowOpen, setRowOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

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

    const addSet = () => {
        dispatch({ type: "TOGGLESET_MODAL", payload: { exerciseId: exerciseId, setNo: null, reps: null, weight: null } });
    }

    const handleEditExercise = () => {
        dispatch({ type: "TOGGLE_MODAL", payload: {uniqueId: uniqueId, exerciseId: String(exerciseId), exerciseName: exerciseName } });
    };

    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell> <TouchableOpacity onPress={handleEditExercise}><Text style={styles.linkUnderlineTitle}>{exerciseName}</Text></TouchableOpacity></DataTable.Cell>
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={OpenRowHandler}>
                            <View style={styles.icon_button}>
                                <Icon name={chevron} size={15} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>

            <Collapsible collapsed={collapsed} duration={475}>

                {state.exercises
                    .filter(ex => ex.exerciseId === exerciseId)
                    .map(ex =>
                        ex.sets.map((set, index) =>(
                            <ListSet key={set.setId} exerciseId={exerciseId} setId={set.setId} setNo={index+1} weight={set.weight} reps={set.reps} />
                        )
                        ))
                }

                <View>
                    <TouchableOpacity style={styles.addSet_button} onPress={addSet}>
                        <Text style={styles.buttonText}>
                            Add Set  <Icon name="plus-square" size={15} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </Collapsible>

            <SetModal
                exerciseId={exerciseId}
            />
        </>
    );
};

export default Exercise;

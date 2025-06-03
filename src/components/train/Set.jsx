import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { DataTable } from 'react-native-paper';
import styles from '../../styles/style';
import { useTrainContext } from '../../context/TrainContext';
import DeleteSetModal from '../modals/DeleteSetModal.jsx';


const Set = ({ exerciseId, setId, setNo, weight, reps }) => {
    const { state, dispatch } = useTrainContext();

    const [thisWeight, setThisWeight] = useState(weight);
    const [thisReps, setThisReps] = useState(reps);

    const SaveSet = () => {
        console.log("Weight " + thisWeight);
        console.log("Reps " + thisReps);
        dispatch(({ type: "SAVE_SET", payload: { exerciseId: exerciseId, setId: setId, weight: thisWeight, reps: thisReps } }));
    }

    const EditSet = () => {
        dispatch({ type: "TOGGLEDELETESET_MODAL", payload: { exerciseId: exerciseId, setId: setId, setNo: setNo } });
    }


    return (
        <>
            <DataTable.Row>
                <TouchableOpacity onPress={EditSet}><DataTable.Cell><Text style={styles.linkUnderline}>Set {setNo}</Text></DataTable.Cell></TouchableOpacity>
                <DataTable.Cell numeric><TextInput
                    value={thisWeight}
                    keyboardType="numeric"         // shows numeric keyboard
                    returnKeyType="done"
                    onChangeText={(text) => {// Only allow digits
                        const numbersOnly = text.replace(/[^0-9.]/g, '');
                        setThisWeight(numbersOnly);
                    }}
                    onBlur={SaveSet}
                    mode="flat"
                    style={{ backgroundColor: 'white', height: 30, width: 100, textAlign: 'center' }}
                    dense
                /></DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'flex-end' }}><TextInput
                    value={thisReps}
                    keyboardType="numeric"         // shows numeric keyboard
                    returnKeyType="done"
                    onChangeText={(text) => setThisReps(text)}
                    onBlur={SaveSet}
                    mode="flat"
                    style={{ backgroundColor: 'white', height: 30, width: 100, textAlign: 'center' }}
                    dense
                /></DataTable.Cell>
            </DataTable.Row>

            <DeleteSetModal />
        </>
    )
}

export default Set;
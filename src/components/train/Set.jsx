import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper';
import styles from '../../styles/style';
import { useTrainContext } from '../../context/TrainContext';


const Set = ({exerciseId, setId, setNo, weight, reps}) => {
    const { state, dispatch } = useTrainContext();

    const EditSet = () => {
        dispatch({ type: "TOGGLESET_MODAL", payload: { exerciseId: exerciseId, setId: setId, setNo: setNo, reps: reps, weight: weight } });
    }
    

    return (
        <DataTable.Row>
            <TouchableOpacity onPress={EditSet}><DataTable.Cell><Text style={styles.linkUnderline}>Set {setNo}</Text></DataTable.Cell></TouchableOpacity>
            <DataTable.Cell numeric>{weight}</DataTable.Cell>
            <DataTable.Cell numeric>{reps}</DataTable.Cell>
        </DataTable.Row>
    )
}

export default Set;
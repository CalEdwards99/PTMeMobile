import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper';
import styles from '../../styles/style';

const Set = ({setNo ,weight, reps}) => {
    return (
        <DataTable.Row>
            <TouchableOpacity><DataTable.Cell><Text style={styles.linkUnderline}>Set {setNo}</Text></DataTable.Cell></TouchableOpacity>
            <DataTable.Cell numeric>{weight}</DataTable.Cell>
            <DataTable.Cell numeric>{reps}</DataTable.Cell>
        </DataTable.Row>
    )
}

export default Set;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper';

const Set = ({setNo ,weight, reps}) => {
    return (
        <DataTable.Row>
            <TouchableOpacity><DataTable.Cell>Set {setNo}</DataTable.Cell></TouchableOpacity>
            <DataTable.Cell numeric>{weight}</DataTable.Cell>
            <DataTable.Cell numeric>{reps}</DataTable.Cell>
        </DataTable.Row>
    )
}

export default Set;
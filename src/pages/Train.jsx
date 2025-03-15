import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style.jsx';

export default function Train() {
    const [chevron, setChevron] = useState("chevron-down")
    const [rowOpen, setRowOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

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

    return (
        <>
            <Text style={[styles.textCenter, { fontSize: 18, marginTop: 7 }]}>Push Day 1</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Exercise</DataTable.Title>
                    <DataTable.Title numeric>Weight (KG)</DataTable.Title>
                    <DataTable.Title numeric>Reps</DataTable.Title>
                </DataTable.Header>
            </DataTable>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell>Barbell Benchpress</DataTable.Cell>
                    <DataTable.Title numeric>
                        <TouchableOpacity onPress={OpenRowHandler}>
                            <Icon name={chevron} size={15} color={"black"} />
                        </TouchableOpacity>
                    </DataTable.Title>
                </DataTable.Header>

                <Collapsible collapsed={collapsed} duration={475} >
                    <DataTable.Row>
                        <DataTable.Cell>Set 1</DataTable.Cell>
                        <DataTable.Cell numeric>100</DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Set 2</DataTable.Cell>
                        <DataTable.Cell numeric>35</DataTable.Cell>
                        <DataTable.Cell numeric>8</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Set 3</DataTable.Cell>
                        <DataTable.Cell numeric>100</DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Set 4</DataTable.Cell>
                        <DataTable.Cell numeric>100</DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                </Collapsible>
            </DataTable>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell>Dumbell Shoulderpress</DataTable.Cell>

                    <DataTable.Title numeric>
                        <Icon name="chevron-down" size={15} color={"black"} />
                    </DataTable.Title>
                </DataTable.Header>
            </DataTable>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell>Tricep Pushdown</DataTable.Cell>
                    <DataTable.Title numeric><Icon name="chevron-down" size={15} color={"black"} /></DataTable.Title>
                </DataTable.Header>

                <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={page => {
                        console.log(page);
                    }}
                    label="1-2 of 6"
                />
            </DataTable>

        </>
    )
};
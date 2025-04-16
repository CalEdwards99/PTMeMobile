import React from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import avatarLocal from '../img/CallumEdwards.jpg';
import Icon from 'react-native-vector-icons/FontAwesome5';

const rankColors = {
    'dizzy': '#E53935',  // 1
    'frown': '#FB8C00',  // 2
    'meh': '#FDD835',    // 3
    'grin': '#43A047',   // 4
    'grin-hearts': '#1E88E5' // 5
  };

const workouts = [
    {
        id: '1',
        user: {
            name: 'Callum Edwards',
            avatar: require("../img/CallumEdwards.jpg"),
        },
        timestamp: '2h ago',
        workoutRank: 'dizzy',
        description: 'Push Day 💪: Bench Press, Incline Dumbbell, Overhead Press, Triceps Dips',
        image: null,
        exercises: [
            { name: 'Bench Press', topSet: '100kg x 5' },
            { name: 'Incline DB Press', topSet: '34kg x 10' },
            { name: 'Triceps Pushdown', topSet: '28kg x 12' },
        ],
    },
    {
        id: '2',
        user: {
            name: 'Callum Edwards',
            avatar: avatarLocal,
        },
        timestamp: 'Yesterday',
        workoutRank: 'grin-hearts',
        description: 'Leg Day 🔥: Squats, Lunges, RDLs, Calf Raises. Brutal!',
        image: null,
        exercises: [
            { name: 'Squats', topSet: '120kg x 6' },
            { name: 'Hip-Thrusts', topSet: '130kg x 8' },
            { name: 'Calf-Raises', topSet: '110kg x 14' },
        ],
    },
    {
        id: '3',
        user: {
            name: 'Callum Edwards',
            avatar: avatarLocal,
        },
        timestamp: '13/04/2025',
        workoutRank: 'grin',
        description: 'Back Day 🔥: Lat Pulldowns, Seated Rows, DB Bicep Curls. Good session, good pump, didnt engage back enough!',
        image: null,
        exercises: [
            { name: 'Lat Pulldowns', topSet: '88kg x 8' },
            { name: 'Seated Rows', topSet: '42kg x 8' },
            { name: 'DB Bicep Curls', topSet: '18kg x 8' },
        ],
    },
    {
        id: '4',
        user: {
            name: 'Callum Edwards',
            avatar: require("../img/CallumEdwards.jpg"),
        },
        timestamp: '12/04/2025',
        workoutRank: 'meh',
        description: 'Push Day 💪: Bench Press, Incline Dumbbell, Overhead Press, Triceps Dips',
        image: null,
        exercises: [
            { name: 'Bench Press', topSet: '100kg x 4' },
            { name: 'Incline DB Press', topSet: '34kg x 9' },
            { name: 'Triceps Pushdown', topSet: '28kg x 10' },
        ],
    },
    {
        id: '5',
        user: {
            name: 'Callum Edwards',
            avatar: avatarLocal,
        },
        timestamp: '11/04/2025',
        workoutRank: 'frown',
        description: 'Leg Day 🔥: Squats, Lunges, RDLs, Calf Raises. Brutal!',
        image: null,
        exercises: [
            { name: 'Squats', topSet: '120kg x 4' },
            { name: 'Hip-Thrusts', topSet: '130kg x 7' },
            { name: 'Calf-Raises', topSet: '110kg x 12' },
        ],
    },
];

const WorkoutFeed = () => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={item.user.avatar } style={styles.avatar} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.name}>{item.user.name}</Text>
                        <Text style={styles.timestamp}>{item.timestamp}</Text>
                    </View>
                </View>
                <Icon name={item.workoutRank}
                 size={36}
                 color={rankColors[item.workoutRank] || '#999'} />
            </View>

            <Text style={styles.description}>{item.description}</Text>
            {item.exercises && (
                <DataTable style={{ marginTop: 8 }}>
                    <DataTable.Header>
                        <DataTable.Title>Exercise</DataTable.Title>
                        <DataTable.Title>Top Set</DataTable.Title>
                    </DataTable.Header>

                    {item.exercises.map((exercise, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>{exercise.name}</DataTable.Cell>
                            <DataTable.Cell>{exercise.topSet}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            )}

            {item.image && <Image source={{ uri: item.image }} style={styles.workoutImage} />}
            <View style={styles.actions}>
                <TouchableOpacity>
                    <Text style={styles.actionText}>❤️ Like</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.actionText}>💬 Comment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            data={workouts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.feed}
        />
    );
};

const styles = StyleSheet.create({
    feed: {
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    name: {
        fontWeight: 'bold',
    },
    timestamp: {
        color: 'gray',
        fontSize: 12,
    },
    description: {
        marginBottom: 8,
        fontSize: 15,
    },
    workoutImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 8,
    },
    actionText: {
        fontWeight: '500',
        color: '#555',
    },
});

export default WorkoutFeed;

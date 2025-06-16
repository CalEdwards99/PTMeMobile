import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import avatarLocal from '../img/CallumEdwards.jpg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useWorkoutFeedContext } from '../context/WorkoutFeedContext.jsx';

const rankColors = {
  'dizzy': '#E53935',  // 1
  'frown': '#FB8C00',  // 2
  'meh': '#FDD835',    // 3
  'grin': '#43A047',   // 4
  'grin-hearts': '#1E88E5' // 5
};

const sessionRatingMap = {
  1: 'dizzy',
  2: 'frown',
  3: 'meh',
  4: 'grin',
  5: 'grin-hearts'
};

const WorkoutFeed = () => {
  const {state,  getWorkoutFeed } = useWorkoutFeedContext();
  const workouts = state.workoutsList ?? [];  // fallback to [] if undefined

  useEffect(() => {
    getWorkoutFeed();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={item.user.avatar} style={styles.avatar} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>{item.user.name}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
        <Icon name={item.workoutRank} size={36} color={rankColors[item.workoutRank] || '#999'} />
      </View>

      <Text style={styles.description}>{item.description}</Text>

      {item.exercises && item.exercises.length > 0 && (
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

  useEffect(() => {
    getWorkoutFeed().catch(err => {
      console.error('Failed to fetch workouts:', err);
    });
  }, []);

  // 🔽 Add this block just before the return
  if (state.loading) {
    return <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>;
  }

  if (!workouts.length) {
    return <Text style={{ textAlign: 'center', marginTop: 50 }}>No workouts found.</Text>;
  }

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

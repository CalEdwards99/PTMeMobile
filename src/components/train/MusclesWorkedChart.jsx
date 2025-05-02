import React from 'react';
import { View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';

const exercises = [
  {
    exerciseId: 1,
    exerciseName: 'BB Benchpress',
    muscle: ['Chest', 'Triceps'],
    sets: [
      { setId: 1, weight: 80, reps: 8 },
      { setId: 2, weight: 90, reps: 6 },
      { setId: 3, weight: 100, reps: 5 },
      { setId: 4, weight: 100, reps: 4 },
    ],
  },
  {
    exerciseId: 2,
    exerciseName: 'Tricep Pushdown',
    muscle: ['Triceps'],
    sets: [
      { setId: 1, weight: 18, reps: 12 },
      { setId: 2, weight: 28, reps: 8 },
      { setId: 3, weight: 28, reps: 8 },
    ],
  },
  {
    exerciseId: 3,
    exerciseName: 'DB Shouldpress',
    muscle: ['Shoulders', 'Triceps'],
    sets: [
      { setId: 1, weight: 36, reps: 14 },
      { setId: 2, weight: 60, reps: 8 },
      { setId: 3, weight: 64, reps: 8 },
    ],
  },
  {
    exerciseId: 4,
    exerciseName: 'Cable Lat-raise',
    muscle: ['Shoulders'],
    sets: [
      { setId: 1, weight: 11, reps: 14 },
      { setId: 2, weight: 11, reps: 14 },
    ],
  },
];

const countSetsByMuscle = (data) => {
  const muscleMap = {};

  data.forEach((exercise) => {
    const numSets = exercise.sets.length;
    exercise.muscle.forEach((muscle) => {
      if (!muscleMap[muscle]) {
        muscleMap[muscle] = 0;
      }
      muscleMap[muscle] += numSets;
    });
  });

  return Object.entries(muscleMap).map(([muscle, count]) => ({
    x: muscle,
    y: count,
  }));
};

const BarChart = () => {
  const barData = countSetsByMuscle(exercises);

  return (
    <View>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 40, y: [0, 20] }}
      >
        <VictoryAxis
          tickFormat={(t) => t}
          style={{ tickLabels: { angle: -45, fontSize: 10, padding: 15 } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(t) => `${t}`}
        />
        <VictoryBar
          data={barData}
          labels={({ datum }) => datum.y}
          style={{
            data: { fill: '#4f83cc' },
            labels: { fontSize: 12, fill: 'black' },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default BarChart;

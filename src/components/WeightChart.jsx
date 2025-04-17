import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryScatter,
} from 'victory-native';

const WeightChart = () => {
  const [currentWeight, setCurrentWeight] = useState(87.0);
  const [goalWeight, setGoalWeight] = useState(90);

  const data = [
    { x: "Oct", y: 80.4 },
    { x: "Nov", y: 82.6 },
    { x: "Dec", y: 84.3 },
    { x: "Jan", y: 86.2 },
    { x: "Feb", y: 86.5 },
    { x: "Mar", y: currentWeight }, // last point is dynamic
  ];

  return (
    <View style={{ padding: 16 }}>
      {/* Form Inputs */}
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Weight (kg):</Text>
          <TextInput
            value={String(currentWeight)}
            onChangeText={(val) => setCurrentWeight(parseFloat(val) || 0)}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Goal Weight (kg):</Text>
          <TextInput
            value={String(goalWeight)}
            onChangeText={(val) => setGoalWeight(parseFloat(val) || 0)}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      </View>

      {/* Victory Chart */}
      <VictoryChart domainPadding={{ x: 20, y: 10 }} domain={{ y: [75, 95] }}>
        <VictoryAxis style={{ tickLabels: { fill: 'black' } }} />
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => `${y}kg`}
          style={{ tickLabels: { fill: 'black' } }}
        />

        {/* Weight Line with Labels */}
        <VictoryLine
          data={data}
          labels={({ datum }) => `${datum.y}kg`}
          style={{
            data: { stroke: "red", strokeWidth: 3 },
            labels: { fill: "black", fontSize: 12, padding: 8 },
          }}
        />

        {/* Dots at each point */}
        <VictoryScatter
          data={data}
          size={5}
          style={{
            data: { fill: "#fff", stroke: "red", strokeWidth: 2 },
          }}
        />

        {/* Goal Line */}
        <VictoryLine
          data={[
            { x: data[0].x, y: goalWeight },
            { x: data[data.length - 1].x, y: goalWeight },
          ]}
          style={{
            data: {
              stroke: "green",
              strokeDasharray: "6,6",
              strokeWidth: 2,
            },
          }}
          labels={["Goal"]}
          labelComponent={
            <VictoryLabel
              dy={-10}
              style={{ fill: 'green', fontWeight: 'bold' }}
            />
          }
        />
      </VictoryChart>
    </View>
  );
};

export default WeightChart;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    color: 'black',
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
  },
});

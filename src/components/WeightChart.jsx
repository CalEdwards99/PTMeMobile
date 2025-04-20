import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Modal } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryScatter,
} from 'victory-native';
import { DataTable, Provider as PaperProvider } from 'react-native-paper';

const WeightChart = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(84.5);
  const [goalWeight, setGoalWeight] = useState(90);

  const data = [
    { x: "Nov", y: 82.6 },
    { x: "Dec", y: 84.3 },
    { x: "Jan", y: 86.2 },
    { x: "Feb", y: 86.5 },
    { x: "Mar", y: 85.0 }, // last point is dynamic
    { x: "Apr", y: currentWeight },
  ];

  const workoutSessions = [
    { session: "86.0 kg - 18/04/2025" },
    { session: "85.8 kg - 10/04/2025" },
    { session: "85.2 kg - 25/03/2025" },
    { session: "86.5 - 15/02/2025" },
    { session: "86.2 - 14/01/2025" },
];

  const openModal = (muscle) => {
    setModalVisible(true);
};

  return (
    <PaperProvider>
      <ScrollView style={{ flex: 1 }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
            <View>
              <Text style={styles.name}>Body Weight</Text>
              <Text style={styles.timestamp}>Track your Body Weight</Text>
            </View>
            <Pressable
            onPress={() => openModal()}
              style={{
                backgroundColor: '#66c2a5',
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 8
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Log Weight</Text>
            </Pressable>
          </View>

          {/* Victory Chart */}
          <VictoryChart domainPadding={{ x: 20, y: 10 }}
            domain={{ y: [75, 95] }}
            padding={{ top: 30, bottom: 40, left: 50, right: 50 }}>
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

          {/* Workout Sessions Card */}
          <View>
            <View style={{ padding: 16 }}>
              <Text style={styles.name}>Log-Book</Text>
              <Text style={styles.timestamp}>History of Logged Weight</Text>
            </View>
            <DataTable>
              <DataTable.Header>
              </DataTable.Header>
              {workoutSessions.map((item, index) => (
                <DataTable.Row
                  key={index}
                  // onPress={() => {
                  //   const data = sessionMuscleMap[item.session] || [];
                  //   setChartData(data);
                  // }}
                >
                  <DataTable.Cell>{item.session}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
        </View>

        {/* Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Log Weight</Text>
              <Text style={styles.modalText}>Current Weight (kg):</Text>
              <TextInput
                value={String(currentWeight)}
                onChangeText={(val) => setCurrentWeight(parseFloat(val) || 0)}
                keyboardType="numeric"
                style={styles.input}
              />

              <Text style={styles.modalText}>Goal Weight (kg)</Text>
              <TextInput
                value={String(goalWeight)}
                onChangeText={(val) => setGoalWeight(parseFloat(val) || 0)}
                keyboardType="numeric"
                style={styles.input}
              />
              <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </PaperProvider >
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  modalSubtitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
    backgroundColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  closeText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  name: {
    fontWeight: 'bold',
  },
  timestamp: {
    color: 'gray',
    fontSize: 12,
  },
});

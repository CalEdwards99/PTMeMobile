// src/components/WeightChart.js
import React from 'react';
import {Dimensions, Text, Animated, View } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import styles from '../styles/style.jsx';

const chartConfig = {
  backgroundColor: "#228B22",
  backgroundGradientFrom: "#228B22",
  backgroundGradientTo: "#228B22",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#DEB22A"
  }
}

const ChartsSection = () => {
  return (
      <LineChart
        data={{
          labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
          datasets: [{
            data: [80.4, 82.6, 84.3, 86.2, 86.5, 87.0]
          }]
        }}
        width={Dimensions.get("window").width} // Same width as calendar
        height={220}
        yAxisSuffix="kg"
        yAxisInterval={1}
        chartConfig={chartConfig}
        bezier
        style={styles.chartWrapper}
      />
  );
};

export default ChartsSection;

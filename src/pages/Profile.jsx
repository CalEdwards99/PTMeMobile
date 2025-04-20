import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text } from 'react-native';
import WeightChart from '../components/WeightChart.jsx';
import Sessions from '../components/user/Sessions.jsx';
import Profile from '../components/user/Profile.jsx'

const TopTab = createMaterialTopTabNavigator();

function SessionsScreen() {
  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Sessions/></View>;
}

function WeightScreen() {
  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><WeightChart/></View>;
}

function ProfileScreen() {
  return <View style={{ flex: 1 }}><Profile/></View>;
}

export default function TopTabsScreen() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarIndicatorStyle: { backgroundColor: '#6200ee' }, // indicator color
        tabBarStyle: { backgroundColor: '#fff' }, // tab bar background
      }}
    >
      <TopTab.Screen name="Sessions" component={SessionsScreen} />
      <TopTab.Screen name="Weight" component={WeightScreen} />
      <TopTab.Screen name="Profile" component={ProfileScreen} />
    </TopTab.Navigator>
  );
}

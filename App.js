import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, StyleSheet, Text, View, Animated, TextInput, TouchableOpacity } from 'react-native';
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import styles from './src/styles/style.jsx';

import { WorkoutFeedProvider } from './src/context/WorkoutFeedContext.jsx';
import { WorkoutProvider } from './src/context/WorkoutContext.jsx';

import { TrainProvider } from './src/context/TrainContext.jsx';
import { UserProvider, useUserContext } from './src/context/UserContext.jsx';

import LoginForm from './src/components/LoginForm.jsx';
import RegisterForm from './src/components/Register.jsx';
import WorkoutScreen from './src/pages/Workouts.jsx';
import WeightScreen from './src/pages/WeightTracker.jsx';
import UserScreen from './src/pages/Profile.jsx'
import TrainScreen from './src/pages/Train.jsx'
import HomeScreen from './src/pages/Homepage.jsx';
import SettingsScreen from './src/pages/UserSettings.jsx';
import APITestScreen from './src/pages/APITest.jsx';
import LiftsScreen from './src/pages/Lifts.jsx';
import WorkoutFeed from './src/pages/WorkoutFeed.jsx';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

export default function App() {

  return (
    <AutocompleteDropdownContextProvider>
      <UserProvider>
        <MainContent />
      </UserProvider>
    </AutocompleteDropdownContextProvider>
  );
}

function MainContent() {
  const { state, logout } = useUserContext();
  const { loggedIn, isSigningUp } = state;

  const Tab = createBottomTabNavigator();

  if (!loggedIn) {
    return isSigningUp ? <RegisterForm /> : <LoginForm />;
  }

  else {

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerRight: () => (
              <>
                <TouchableOpacity onPress={() => alert("Take user to notifications screen!")} style={{ marginRight: 17 }}>
                  <Icon name="bell" size={17} color="#000" />
                </TouchableOpacity>
                {/* </><TouchableOpacity onPress={() => alert("Take user to settings screen!")} style={{ marginRight: 17 }}> */}
                <TouchableOpacity onPress={() => logout()} style={{ marginRight: 17 }}>
                  <Icon name="gear" size={17} color="#000" />
                </TouchableOpacity>
              </>
            ),
          }}
        >
          {/* <Tab.Screen
            name="Home"
            component={WorkoutFeed}
            options={{ tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} /> }}
          /> */}
          <Tab.Screen
            name="Home"
            component={() => (
              <WorkoutFeedProvider>
                <WorkoutFeed />
              </WorkoutFeedProvider>
            )}
            options={{ tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} /> }}
          />
          <Tab.Screen
            name="Workouts"
            component={() => (
              <WorkoutProvider>
                <WorkoutScreen />
              </WorkoutProvider>
            )}
            options={{ tabBarIcon: ({ color, size }) => <Icon name="book" size={size} color={color} /> }}
          />
          <Tab.Screen
            name="Train"
            component={() => (
              <TrainProvider>
                <TrainScreen />
              </TrainProvider>
            )}
            options={{ tabBarIcon: ({ color, size }) => <MatIcon name="dumbbell" size={size} color={color} /> }}
          />
          <Tab.Screen
            name="Lifts"
            component={LiftsScreen}
            options={{ tabBarIcon: ({ color, size }) => <MatIcon name="trophy" size={size} color={color} /> }}
          />
          <Tab.Screen
            name="Me"
            component={UserScreen}
            options={{ tabBarIcon: ({ color, size }) => <Icon name="user" size={size} color={color} /> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
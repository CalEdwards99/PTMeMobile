import 'react-native-reanimated';
import React, { useState, useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { WorkoutFeedProvider } from './src/context/WorkoutFeedContext.jsx';
import { WorkoutProvider } from './src/context/WorkoutContext.jsx';

import { TrainProvider } from './src/context/TrainContext.jsx';
import { UserProvider, useUserContext } from './src/context/UserContext.jsx';

import LoginForm from './src/components/LoginForm.jsx';
import RegisterForm from './src/components/Register.jsx';
import WorkoutFeed from './src/pages/WorkoutFeed.jsx';
import WorkoutScreen from './src/pages/Workouts.jsx';
import TrainScreen from './src/pages/Train.jsx';
import LiftsScreen from './src/pages/Lifts.jsx';
import UserScreen from './src/pages/Profile.jsx'

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
                <TouchableOpacity onPress={() => logout()} style={{ marginRight: 17 }}>
                  <Icon name="gear" size={17} color="#000" />
                </TouchableOpacity>
              </>
            ),
          }}
        >
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
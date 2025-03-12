import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, StyleSheet, Text, View, Animated, TextInput, TouchableOpacity } from 'react-native';
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';


import styles from './src/styles/style.jsx';
import LoginForm from './src/components/LoginForm.jsx';
import WorkoutScreen from './src/pages/Workouts.jsx';
import WeightScreen from './src/pages/WeightTracker.jsx';
import HomeScreen from './src/pages/Homepage.jsx';
import SettingsScreen from './src/pages/UserSettings.jsx';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status
  const [fadeAnim] = useState(new Animated.Value(0)); // Animated value for fade-in effect

  useEffect(() => {
    if (isLoggedIn) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoggedIn]);

  // Function to handle login button press
  const handleLogin = () => {
    !isLoggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false)
  };

  const Tab = createBottomTabNavigator();

  return (
    <>

      {!isLoggedIn ? (
        // Show the login form if the user is not logged in
        <View style={styles.container}>
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </View>
      ) : (
        // Show the charts if the user is logged in
        <>

          <NavigationContainer>
            <Tab.Navigator>
              
              {/* <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: ({color, size}) => (<Icon name="home" size={size} color={color} />)}} /> */}
              
              <Tab.Screen name="Workouts" component={WorkoutScreen} options={{tabBarIcon: ({color, size}) => (<Icon name="book" size={size} color={color} />)}} />

              <Tab.Screen name="Weight" component={WeightScreen} options={{tabBarIcon: ({color, size}) => (<Icon name="balance-scale" size={size} color={color} />)}}/>

              <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarIcon: ({color, size}) => (<Icon name="gear" size={size} color={color} />)}}/>

            </Tab.Navigator>
          </NavigationContainer>

          {/* Logout Button */}
          {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity> */}

        </>
      )}

    </>

  );
}

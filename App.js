import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, Animated, TextInput, TouchableOpacity } from 'react-native';
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import { Calendar } from 'react-native-calendars';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  button: {
    backgroundColor: '#1D4ED8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 12,
    fontSize: 16,
    width: Dimensions.get("window").width * 0.8,  // Set width to 80% of screen width
  },
  textCenter: {
    textAlign: 'center',
  },
  linkText: {
    color: '#1D4ED8',
  },
  chartWrapper: {
    marginVertical: 8,
    borderRadius: 16,
    width: Dimensions.get("window").width * 0.9, // Chart width
  },

  logoutButton: {
    backgroundColor: '#DC2626', // Red color for logout button
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  calendarWrapper: {
    width: Dimensions.get("window").width * 0.9, // Calendar width should match chart
    marginTop: 20,
  },
});

const chartConfig = {
  backgroundColor: "#228B22",
  backgroundGradientFrom: "#228B22",
  backgroundGradientTo: "#228B22",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 8
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#DEB22A"
  }
}

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

  const onDayPress = (day) => {
    console.log('selected day', day);
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        // Show the login form if the user is not logged in
        <>
          <Text style={[styles.textCenter, { fontSize: 30, fontWeight: 'bold', color: '#1D4ED8', marginBottom: 20 }]}>Login</Text>

          {/* Login Form */}
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          {/* Forgot Password and Sign Up Links */}
          <TouchableOpacity>
            <Text style={[styles.textCenter, styles.linkText]}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.textCenter, { color: '#4B5563' }]}>
              Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        // Show the charts if the user is logged in
        <>
          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={[styles.textCenter, { fontSize: 20, marginTop: 30 }]}>Weight (Kilos)</Text>
          <Animated.View style={{ opacity: fadeAnim }}>
            <LineChart
              data={{
                labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
                datasets: [{
                  data: [80.4, 82.6, 84.3, 86.2, 86.5, 87.0]
                }]
              }}
              width={Dimensions.get("window").width * 0.9} // Same width as calendar
              height={220}
              yAxisSuffix="kg"
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              style={styles.chartWrapper}
            />
          </Animated.View>

          <Text style={[styles.textCenter, { fontSize: 20, marginTop: 30 }]}>Gym Visits Last 30 Days</Text>
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={styles.calendarWrapper}>
              <Calendar
                // Initially visible month. Default = Date()
                current={'2025-03-06'}
                // Minimum date that can be selected
                minDate={'2025-03-01'}
                // Maximum date that can be selected
                maxDate={'2025-03-31'}
                // Handler which gets executed on day press
                onDayPress={onDayPress}
                // Month format in header. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MMMM yyyy'}
                // Hide month navigation arrows. Default = false
                hideExtraDays={true}
                // Show week numbers (if true)
                showWeekNumbers={true}
                // Custom styles for the calendar
                markedDates={{
                  '2025-03-06': {
                    selected: true,
                    marked: true,
                    selectedColor: '#228B22',
                  },
                }}
              />
            </View>
          </Animated.View>
        </>
      )}
    </View>
  );
}

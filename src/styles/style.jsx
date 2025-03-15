// src/styles.js
import { StyleSheet, Dimensions } from 'react-native';

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
  finish_button: {
    backgroundColor: '#1D4ED8',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  icon_button: {
    paddingLeft: 7,
    paddingRight: 0,
    paddingTop: 4,
    paddingBottom: 4,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',    borderRadius: 8,
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
    borderRadius: 0,
    width: Dimensions.get("window").width, // Chart width
  },
});

export default styles;

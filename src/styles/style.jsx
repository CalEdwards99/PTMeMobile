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
  addSet_button: {
    backgroundColor: '#66c2a5',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },

  editworkout_button: {
    backgroundColor: '#1D4ED8',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },

  edit_button: {
    backgroundColor: '#3288bd',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    margin: 20,
  },

  delete_button: {
    backgroundColor: '#b33030',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    margin: 20,
  },

  submit_button: {
    backgroundColor: '#66c2a5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    margin: 20,
  },

  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB', borderRadius: 8,
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
  underlineTitle: {
    fontWeight: 'bold'
  },
  linkUnderlineTitle: {
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  linkUnderline: {
    textDecorationLine: 'underline'
  },
  chartWrapper: {
    marginVertical: 8,
    borderRadius: 0,
    width: Dimensions.get("window").width, // Chart width
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
  modalSaveButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
    backgroundColor: '#66c2a5',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  modalDeleteButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
    backgroundColor: '#b33030',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText:{
    color: "white",
    fontWeight: 'bold',
    fontSize: 13,
  },
  modalButtonText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 14,
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

export default styles;

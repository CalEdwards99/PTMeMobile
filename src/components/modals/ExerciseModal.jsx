import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useTrainContext } from '../../context/TrainContext.jsx';

const ExerciseModal = () => {

  // Get values and functions from context
  const {
    currentExercise,
    selectedExerciseId,
    setCurrentExercise,
    isExerciseModalVisible,
    addExercise,
    removeExercise,
    toggleExerciseModal
  } = useTrainContext();

  return (
    <Modal
      isVisible={isExerciseModalVisible}
      onBackdropPress={toggleExerciseModal} // Close modal on backdrop click
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver={true} // Native driver for smoother animations
    >
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
      {selectedExerciseId != null ? (<Text style={{ fontSize: 18, marginBottom: 10 }}>Edit Exercise</Text>):
      (<Text style={{ fontSize: 18, marginBottom: 10 }}>Add Exercise</Text>)}
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              flex: 1, // This makes the input fill the available space
              marginRight: 10, // Adds space between the two inputs
            }}
            value={currentExercise} // Bind the value to the context's currentExercise
            placeholder="Exercise"
            onChangeText={(text) => setCurrentExercise(text)} // Update exercise using context function
          />
        </View>

        {/* Modal Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={addExercise} style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Save</Text>
          </TouchableOpacity>

          {selectedExerciseId != null && (
            <TouchableOpacity onPress={removeExercise} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
          )}
            <TouchableOpacity onPress={toggleExerciseModal} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseModal;

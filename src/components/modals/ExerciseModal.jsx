import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useTrainContext } from '../../context/TrainContext.jsx';

const ExerciseModal = () => {

  const { state, dispatch } = useTrainContext();

  // Sync local state with global state when modal opens
  useEffect(() => {
    setCurrentExercise(state.currentExercise || '');
  }, [state.isExerciseModalVisible, state.currentExercise]);

  const [currentExercise, setCurrentExercise] = useState('');

  function toggleModal(){
    dispatch({type:"TOGGLE_MODAL", payload: { exerciseId: null, exerciseName: null}})
  };

  function saveExercise(){
    dispatch(({type:"SAVE_EXERCISE", payload: {exerciseId: state.selectedExerciseId, exerciseName: currentExercise}}))
    toggleModal();
  }

  function removeExercise(){
    dispatch({type:"REMOVE_EXERCISE", payload: { exerciseId: state.selectedExerciseId}})
    toggleModal();
  }

  return (
    <Modal
      isVisible={state.isExerciseModalVisible}
      onBackdropPress={toggleModal} 
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver={true} // Native driver for smoother animations
    >
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
      {state.selectedExerciseId != null ? (<Text style={{ fontSize: 18, marginBottom: 10 }}>Edit Exercise</Text>):
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
          <TouchableOpacity onPress={saveExercise} style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Save</Text>
          </TouchableOpacity>

          {state.selectedExerciseId != null && (
            <TouchableOpacity onPress={removeExercise} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
          )}
            <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseModal;

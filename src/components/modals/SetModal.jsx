import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTrainContext } from '../../context/TrainContext';

const SetModal = ({exerciseId}) => {

  const { state, dispatch } = useTrainContext();

  const [currentWeight, setCurrentWeight] = useState('');
  const [currentReps, setCurrentReps] = useState('');

   // Sync local state with global state when modal opens
    useEffect(() => {
      setCurrentWeight(state.selectedSetWeight || '');
      setCurrentReps(state.selectedSetReps || '');
    }, [state.setModalVisible, state.selectedSetWeight, state.selectedSetReps]);

    function saveSet(){
      console.log("Exercise ID in saveSet:", state.selectedExerciseId);
      console.log("exerciseId" + exerciseId);
      console.log("weight" + currentWeight);
      console.log("sets" + currentReps)
      dispatch(({type:"ADD_SET", payload: {exerciseId: state.selectedExerciseId, weight: currentWeight, reps: currentReps}}))
      closeModal();
    }

    function removeExercise(){
      dispatch({type:"REMOVE_EXERCISE", payload: { exerciseId: state.selectedExerciseId}})
      closeModal();
    }

  function closeModal(){
    dispatch({ type: "TOGGLESET_MODAL", payload: { setNo: null, reps:null, weight: null } });
  };

  return (
    <Modal
      isVisible={state.isSetModalVisible}
      onBackdropPress={closeModal} // Close modal on backdrop click
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver={true} // Native driver for smoother animations
    >
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          {/* {setName ? 'Edit ' + setName : 'Add Set'} */}
          Add Set
        </Text>

        {/* Weight Input */}
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Weight (kg):</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 15,
          }}
          value={currentWeight}
          placeholder="Enter weight"
          keyboardType="numeric"
          onChangeText={(text) => setCurrentWeight(text)}
        />

        {/* Reps Input */}
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Reps:</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 20,
          }}
          value={currentReps}
          placeholder="Enter reps"
          keyboardType="numeric"
          onChangeText={(text) => setCurrentReps(text)}
        />

        {/* Modal Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={saveSet} style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SetModal;

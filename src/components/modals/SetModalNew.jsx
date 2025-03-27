import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTrainContext } from '../../context/TrainContext';

const SetModal = ({ isModalVisible, toggleModal, weight = '', reps = '', setName = '', onSave}) => {

  const [state, dispatch] = useTrainContext();

  const [currentWeight, setCurrentWeight] = useState(weight);
  const [currentReps, setCurrentReps] = useState(reps);

  useEffect(() => {
    setCurrentWeight(weight);
    setCurrentReps(reps);
  },[weight,reps,isModalVisible] )

  const handleSave = () => {
    if (onSave){
      onSave(currentWeight, currentReps);
    };

    toggleModal();
  }

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal} // Close modal on backdrop click
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver={true} // Native driver for smoother animations
    >
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          {setName ? 'Edit ' + setName : 'Add Set'}
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
          <TouchableOpacity onPress={handleSave} style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SetModal;

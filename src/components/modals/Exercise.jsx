import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

const SetModal = ({ isModalVisible, toggleModal }) => {
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
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Add Exercise</Text>
        
        {/* Side-by-side Text Inputs */}
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
            placeholder="Exercise"
          />
          
        </View>
        
        {/* Modal Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}>
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

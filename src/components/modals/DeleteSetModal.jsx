import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTrainContext } from '../../context/TrainContext';
import styles from '../../styles/style';

const DeleteSetModal = () => {

  const { state, dispatch } = useTrainContext();

  function removeSet() {
    console.log("selected exercise of set to be removed: " + state.selectedExerciseId)
    console.log("selected set to be removed: " + state.selectedSetId)
    dispatch({ type: "REMOVE_SET", payload: { exerciseId: state.selectedExerciseId, setId: state.selectedSetId } })
    closeModal();
  }

  function closeModal() {
    dispatch({ type: "TOGGLEDELETESET_MODAL", payload: { setNo: null } });
  };

  return (
    <Modal
      isVisible={state.isDeleteSetModalVisible}
      onBackdropPress={closeModal} // Close modal on backdrop click
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver={true} // Native driver for smoother animations
    >
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          {'Set ' + state.selectedSetName}
        </Text>

        {/* Modal Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {state.selectedSetId != null && (
            <TouchableOpacity onPress={removeSet} style={styles.modalDeleteButton}>
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteSetModal;

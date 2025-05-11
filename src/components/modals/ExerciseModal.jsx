import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { useTrainContext } from '../../context/TrainContext.jsx';
import styles from '../../styles/style.jsx';

const ExerciseModal = () => {
  const { state, dispatch } = useTrainContext();
  const [currentExercise, setCurrentExercise] = useState('');
  const [currentExerciseId, setCurrentExerciseId] = useState('');

  useEffect(() => {
    if (state.selectedExerciseId) {
      const matched = state.listAllExercises.find(
        (ex) => ex.id.toString() === state.selectedExerciseId.toString()
      );
      if (matched) {
        setCurrentExercise(matched.title);
        setCurrentExerciseId(matched.id.toString());
      }
    } else {
      setCurrentExercise('');
      setCurrentExerciseId('');
    }
  }, [state.isExerciseModalVisible, state.selectedUniqueId]);

  const dropdownDataSet = useMemo(() => {
    return state.listAllExercises.map((e) => ({
      id: e.id.toString(),
      title: `${e.title} (${e.muscleGroup})`
    }));
  }, [state.listAllExercises]);

  function toggleModal() {
    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        exerciseId: null,
        exerciseName: null,
        selectedUniqueId: null
      }
    });
  }

  function saveExercise() {
    dispatch({
      type: 'SAVE_EXERCISE',
      payload: {
        uniqueId: state.selectedUniqueId,
        exerciseId: currentExerciseId,
        exerciseName: currentExercise
      }
    });
    toggleModal();
  }

  function removeExercise() {
    dispatch({
      type: 'REMOVE_EXERCISE',
      payload: { uniqueId: state.selectedUniqueId }
    });
    toggleModal();
  }

  if (!state.listAllExercises || state.listAllExercises.length === 0) {
    return null; // or return a loading spinner
  }

  return (
    <Modal
      isVisible={state.isExerciseModalVisible}
      onBackdropPress={toggleModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver={true}
      avoidKeyboard={true}
      propagateSwipe={true}
      style={{ justifyContent: 'flex-start', marginTop: 50 }}
    >
      <AutocompleteDropdownContextProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10 }}>
                {state.selectedExerciseId != null
                  ? 'Edit Exercise'
                  : 'Add Exercise'}
              </Text>

              <SafeAreaView style={{ marginBottom: 20 }}>
                <AutocompleteDropdown
                  usePortal={true}
                  clearOnFocus={false}
                  closeOnBlur={true}
                  closeOnSubmit={false}
                  initialValue={
                    state.selectedExerciseId
                      ? { id: state.selectedExerciseId.toString() }
                      : undefined
                  }
                  dataSet={dropdownDataSet}
                  searchTextExtractor={(item) =>
                    item.title.toLowerCase()
                  }
                  onSelectItem={(item) => {
                    console.log("item selected:", JSON.stringify(item, null, 2));
                    if (item?.title) {
                      const [title] = item.title.split(' (');
                      setCurrentExercise(title.trim());
                      setCurrentExerciseId(item.id.toString());
                    } else {
                      console.log("no exercise selected");
                    }
                  }}
                  renderItem={(item) => {
                    const match = item.title.match(/^(.*?) \((.*?)\)$/);
                    const exerciseName = match?.[1] || item.title;
                    const muscleGroup = match?.[2] || '';
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 8
                        }}
                      >
                        <Text style={{ fontSize: 16, color: '#000' }}>
                          {exerciseName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'grey',
                            marginLeft: 6
                          }}
                        >
                          ({muscleGroup})
                        </Text>
                      </View>
                    );
                  }}
                  textInputProps={{
                    placeholder: 'Search by name or muscle group',
                    autoCorrect: false,
                    autoCapitalize: 'none',
                    style: {
                      color: '#000',
                      fontSize: 16
                    }
                  }}
                  inputContainerStyle={{
                    backgroundColor: '#f0f0f0',
                    borderRadius: 8,
                    paddingHorizontal: 12
                  }}
                />
              </SafeAreaView>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <TouchableOpacity
                  onPress={saveExercise}
                  style={styles.modalSaveButton}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>

                {state.selectedExerciseId != null && (
                  <TouchableOpacity
                    onPress={removeExercise}
                    style={styles.modalDeleteButton}
                  >
                    <Text style={styles.modalButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={toggleModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </AutocompleteDropdownContextProvider>
    </Modal>
  );
};

export default ExerciseModal;

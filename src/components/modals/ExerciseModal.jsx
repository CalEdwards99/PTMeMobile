import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import Modal from 'react-native-modal';
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider
} from 'react-native-autocomplete-dropdown';
import { useTrainContext } from '../../context/TrainContext.jsx';

const ExerciseModal = () => {
  const { state, dispatch } = useTrainContext();
  const [currentExercise, setCurrentExercise] = useState('');
  const [currentExerciseId, setCurrentExerciseId] = useState();

  useEffect(() => {
    setCurrentExercise(state.currentExercise || '');
  }, [state.isExerciseModalVisible, state.currentExercise]);

  const exercises = [
    { id: '1', title: 'Bench Press', muscleGroup: 'Chest' },
    { id: '2', title: 'Push Up', muscleGroup: 'Chest' },
    { id: '3', title: 'Deadlift', muscleGroup: 'Back' },
    { id: '4', title: 'Pull Up', muscleGroup: 'Back' },
    { id: '5', title: 'Squat', muscleGroup: 'Legs' },
    { id: '6', title: 'Lunges', muscleGroup: 'Legs' },
    { id: '7', title: 'Overhead Press', muscleGroup: 'Shoulders' },
    { id: '8', title: 'Bicep Curl', muscleGroup: 'Arms' },
    { id: '9', title: 'Tricep Dip', muscleGroup: 'Arms' },
    { id: '10', title: 'Plank', muscleGroup: 'Core' },
    { id: '11', title: 'Russian Twist', muscleGroup: 'Core' },
    { id: '12', title: 'Mountain Climbers', muscleGroup: 'Cardio' },
    { id: '13', title: 'Burpees', muscleGroup: 'Full Body' },
    { id: '14', title: 'Kettlebell Swing', muscleGroup: 'Full Body' },
    { id: '15', title: 'Shoulder Press', muscleGroup: 'Shoulders' },
    { id: '16', title: 'Leg Press', muscleGroup: 'Legs' },
    { id: '17', title: 'Leg Curl', muscleGroup: 'Legs' },
    { id: '18', title: 'Calf Raise', muscleGroup: 'Legs' },
    { id: '19', title: 'Lat Pulldown', muscleGroup: 'Back' },
    { id: '20', title: 'Seated Row', muscleGroup: 'Back' },
    { id: '21', title: 'Incline Bench Press', muscleGroup: 'Chest' },
    { id: '22', title: 'Decline Bench Press', muscleGroup: 'Chest' },
    { id: '23', title: 'Chest Fly', muscleGroup: 'Chest' },
    { id: '24', title: 'Face Pull', muscleGroup: 'Shoulders' },
    { id: '25', title: 'Cable Crossover', muscleGroup: 'Chest' },
    { id: '26', title: 'Hammer Curl', muscleGroup: 'Arms' },
    { id: '27', title: 'Skull Crusher', muscleGroup: 'Arms' },
    { id: '28', title: 'Farmer’s Carry', muscleGroup: 'Full Body' },
    { id: '29', title: 'Box Jump', muscleGroup: 'Legs' },
    { id: '30', title: 'Wall Sit', muscleGroup: 'Legs' }
  ];

  function toggleModal() {
    dispatch({ type: "TOGGLE_MODAL", payload: { exerciseId: null, exerciseName: null } });
  }

  function saveExercise() {
    dispatch({
      type: "SAVE_EXERCISE",
      payload: {
        exerciseId: state.selectedExerciseId,
        exerciseName: currentExercise
      }
    });
    toggleModal();
  }

  function removeExercise() {
    dispatch({
      type: "REMOVE_EXERCISE",
      payload: { exerciseId: state.selectedExerciseId }
    });
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
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>
                {state.selectedExerciseId != null ? 'Edit Exercise' : 'Add Exercise'}
              </Text>

              <SafeAreaView style={{ marginBottom: 20 }}>

                <AutocompleteDropdown
                  usePortal={true}
                  clearOnFocus={false}
                  closeOnBlur={true}
                  closeOnSubmit={false}
                  dataSet={exercises.map(e => ({
                    id: e.id,
                    title: `${e.title} (${e.muscleGroup})`  // valid for search
                  }))}
                  searchTextExtractor={(item) =>
                    item.title.toLowerCase() // still includes muscleGroup in title
                  }
                  onSelectItem={(item) => {
                    if (item) {
                      const [title] = item.title.split(' ('); // split to extract actual title
                      setCurrentExercise(title);
                      //setSearchExercise(title);
                    }
                  }}
                  renderItem={(item) => {
                    const match = item.title.match(/^(.*?) \((.*?)\)$/);
                    const exerciseName = match?.[1] || item.title;
                    const muscleGroup = match?.[2] || '';
                    return (
                      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                        <Text style={{ fontSize: 16, color: '#000' }}>{exerciseName}</Text>
                        <Text style={{ fontSize: 12, color: 'grey', marginLeft: 6 }}>
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
                      fontSize: 16,
                    }
                  }}
                  inputContainerStyle={{
                    backgroundColor: '#f0f0f0',
                    borderRadius: 8,
                    paddingHorizontal: 12,
                  }}
                />
              </SafeAreaView>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  onPress={saveExercise}
                  style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}
                >
                  <Text style={{ color: 'white' }}>Save</Text>
                </TouchableOpacity>

                {state.selectedExerciseId != null && (
                  <TouchableOpacity
                    onPress={removeExercise}
                    style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}
                  >
                    <Text style={{ color: 'white' }}>Delete</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={toggleModal}
                  style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}
                >
                  <Text style={{ color: 'white' }}>Cancel</Text>
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

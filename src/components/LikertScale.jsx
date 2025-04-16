import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// const LikertScale = ({ labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'], onSelect }) => {
const LikertScale = ({ labels = ['dizzy', 'frown', 'meh', 'grin', 'grin-hearts'], onSelect }) => {
  const [selected, setSelected] = useState(null);

  const iconSize = 30;

  const handlePress = (index) => {
    setSelected(index);
    if (onSelect) onSelect(index);
  };

  return (
    <View style={styles.container}>
      {labels.map((label, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.item, selected === index && styles.selected]}
          onPress={() => handlePress(index)}
        >
          {/* <Text style={[styles.text, selected === index && styles.selectedText]}>{index + 1}</Text> */}
          <Text style={[styles.text, selected === index && styles.selectedText]}><Icon name={label} size={iconSize}/></Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  item: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#4a90e2',
  },
  text: {
    color: '#333',
    fontSize: 16,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LikertScale;

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import { calendarTheme } from 'react-native-calendars';

const MyCalendar = () => {
  const [items, setItems] = useState({
    '2025-03-04': [{ name: 'Meeting with client', time: '10:00 AM' }],
    '2025-03-05': [{ name: 'Team brainstorming session', time: '9:00 AM' }, { name: 'Project presentation', time: '2:00 PM' }, { name: 'Project presentation', time: '5:00 PM' }],
    '2025-03-01': [{ name: 'Team brainstorming session', time: '9:00 AM' }, { name: 'Project presentation', time: '2:00 PM' }],
    '2025-03-02': [{ name: 'Team brainstorming session', time: '9:00 AM' }, { name: 'Project presentation', time: '2:00 PM' }],
  });

  const renderEmptyData = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No events for this day</Text>
      </View>
    );
  };

  return (   
      <Agenda
        items={items}
        showOnlySelectedDayItems={true}
        renderEmptyData={renderEmptyData} 
        theme={calendarTheme}
        renderItem={(item) => (
          <View style={{ marginVertical: 10, marginTop: 30, backgroundColor: 'white', marginHorizontal: 10, padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.time}</Text>
          </View>
        )}
      />
  );
}

export default MyCalendar;
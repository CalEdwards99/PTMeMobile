import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TextInput, Pressable } from 'react-native';
import { DataTable, Provider as PaperProvider } from 'react-native-paper';


const mockUser = {
  name: "Callum Edwards",
  username: "CalEdwards99",
  email: "cmdedwards99@gmail.com",
  password: "********",
  profilePhoto: require("../../img/CallumEdwards.jpg") // replace with real URI
};

const mockFriends = [
  { name: "Ryan Harger", username: "RyanHarger123" },
  { name: "Jack Love-Jones", username: "JLJ" },
  { name: "Mike Nickells", username: "MikeyBoy" },
  { name: "Ollie Nash", username: "Nasher99" },
];

const ProfileScreen = () => {
  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <Image source={mockUser.profilePhoto} style={styles.avatar} />
          <Text style={styles.name}>{mockUser.name}</Text>
          <Text style={styles.username}>@{mockUser.username}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={mockUser.email} editable={false} />

          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} value={mockUser.password} secureTextEntry editable={false} />

          <Pressable style={styles.editButton}>
            <Text style={styles.editText}>Edit Profile</Text>
          </Pressable>
        </View>

        <View style={styles.friendsSection}>
          <Text style={styles.sectionTitle}>Friends</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Username</DataTable.Title>
            </DataTable.Header>
            {mockFriends.map((friend, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{friend.name}</DataTable.Cell>
                <DataTable.Cell>{friend.username}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    color: 'gray',
  },
  infoSection: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 4,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#3288bd',
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
  },
  friendsSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default ProfileScreen;

import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useUserContext } from '../context/UserContext.jsx';
import styles from '../styles/style.jsx';


const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch, register } = useUserContext();
  const { loading, error, message } = state;

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    register(email, password);

  };

  function closeSignUp() {
    dispatch({ type: "TOGGLE_SIGN_UP" })
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.textCenter, { fontSize: 30, fontWeight: 'bold', color: '#1D4ED8', marginBottom: 20 }]}>Register</Text>

      {/* Register Form */}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
      />

      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {message && <Text style={{ color: 'green' }}>{message}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeSignUp}>
            <Text style={[styles.textCenter, styles.linkText]}>Back to Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default Register
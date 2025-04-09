// src/components/LoginForm.js
import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, } from 'react-native';
import { useUserContext } from '../context/UserContext.jsx';

import styles from '../styles/style.jsx';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state,dispatch, login } = useUserContext();
  const { loading, error, message } = state; //destructuring the state?

  function handleLogin() {
    login(email, password);
  };

  function openSignUp() {
    dispatch({ type: "TOGGLE_SIGN_UP" })
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.textCenter, { fontSize: 30, fontWeight: 'bold', color: '#1D4ED8', marginBottom: 20 }]}>Login</Text>

      {/* Login Form */}
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

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.textCenter, styles.linkText]}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openSignUp}>
            <Text style={[styles.textCenter, { color: '#4B5563' }]}>
              Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </>

      )}
      {/* Login Button */}
    </View>
  );
};

export default LoginForm;

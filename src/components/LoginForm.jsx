// src/components/LoginForm.js
import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useUserContext } from '../context/UserContext.jsx';

import styles from '../styles/style.jsx';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch } = useUserContext();

  function handleLogin() {
    dispatch({ type: "LOGIN", payload: { email: email, password: password } })
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

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Forgot Password and Sign Up Links */}
      <TouchableOpacity>
        <Text style={[styles.textCenter, styles.linkText]}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openSignUp}>
        <Text style={[styles.textCenter, { color: '#4B5563' }]}>
          Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
